const fs = require("fs");
const Parser = require("rss-parser");

const parser = new Parser();

const FEED_URL =
  "https://news.google.com/rss/search?q=measles&hl=en-US&gl=US&ceid=US:en";

const BLOCKED_DOMAINS = [
  "childrenshealthdefense.org",
  "nvic.org",
  "learntherisk.org"
];

const OFFICIAL_DOMAINS = [
  ".gov",
  "who.int",
  "cdc.gov"
];

const ACADEMIC_DOMAINS = [
  ".edu"
];

function getHostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function classifySource(link, sourceUrl) {
  const url = sourceUrl || link || "";
  const host = getHostname(url);

  if (OFFICIAL_DOMAINS.some(d => host.endsWith(d) || host.includes(d))) {
    return { sourceType: "official", sourceLabel: "Official public health", priority: 1 };
  }

  if (ACADEMIC_DOMAINS.some(d => host.endsWith(d))) {
    return { sourceType: "academic", sourceLabel: "Academic", priority: 2 };
  }

  return { sourceType: "news", sourceLabel: "News", priority: 3 };
}

function isBlocked(link, sourceUrl) {
  const host1 = getHostname(link);
  const host2 = getHostname(sourceUrl || "");
  return BLOCKED_DOMAINS.some(d => host1.includes(d) || host2.includes(d));
}

function cleanText(text = "") {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function dedupeKey(item) {
  return item.title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  const feed = await parser.parseURL(FEED_URL);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const items = (feed.items || [])
    .map(item => {
      const sourceUrl =
        item.source?.url ||
        item.enclosure?.url ||
        "";

      const meta = classifySource(item.link, sourceUrl);

      return {
        title: cleanText(item.title || ""),
        link: item.link || "",
        pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
        description: cleanText(item.contentSnippet || item.content || "").slice(0, 280),
        source: item.source?.title || item.creator || getHostname(item.link) || "Unknown source",
        sourceType: meta.sourceType,
        sourceLabel: meta.sourceLabel,
        priority: meta.priority,
        sourceUrl
      };
    })
    .filter(item => item.link)
    .filter(item => !isBlocked(item.link, item.sourceUrl))
    .filter(item => new Date(item.pubDate) >= sevenDaysAgo);

  const seen = new Set();
  const deduped = items.filter(item => {
    const key = dedupeKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  deduped.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return new Date(b.pubDate) - new Date(a.pubDate);
  });

  const payload = {
    updatedAt: new Date().toISOString(),
    itemCount: deduped.length,
    items: deduped.map(({ priority, sourceUrl, ...rest }) => rest)
  };

  fs.mkdirSync("data", { recursive: true });
  fs.writeFileSync("data/measles_news.json", JSON.stringify(payload, null, 2));
  console.log(`Saved ${payload.itemCount} items to data/measles_news.json`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
