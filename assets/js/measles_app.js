let allItems = [];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

function renderNews(items) {
  const container = document.getElementById("news-grid");
  const status = document.getElementById("status");

  if (!items.length) {
    status.textContent = "No matching stories found.";
    container.innerHTML = "";
    return;
  }

  status.textContent = `${items.length} story${items.length === 1 ? "" : "ies"} shown`;

  container.innerHTML = items.map(item => `
    <article class="news-card">
      <div class="news-meta">
        <span class="badge ${item.sourceType}">${item.sourceLabel}</span>
        <span>${escapeHtml(item.source)}</span>
        <span>${formatDate(item.pubDate)}</span>
      </div>
      <h3>
        <a href="${item.link}" target="_blank" rel="noopener noreferrer">
          ${escapeHtml(item.title)}
        </a>
      </h3>
      <p>${escapeHtml(item.description || "No summary available.")}</p>
    </article>
  `).join("");
}

function applyFilters() {
  const query = document.getElementById("searchBox").value.trim().toLowerCase();
  const sourceType = document.getElementById("sourceFilter").value;

  const filtered = allItems.filter(item => {
    const matchesText =
      item.title.toLowerCase().includes(query) ||
      item.source.toLowerCase().includes(query) ||
      (item.description || "").toLowerCase().includes(query);

    const matchesType = sourceType === "all" || item.sourceType === sourceType;

    return matchesText && matchesType;
  });

  renderNews(filtered);
}

async function init() {
  const status = document.getElementById("status");

  try {
    const response = await fetch("data/news.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload = await response.json();
    allItems = payload.items || [];

    document.getElementById("last-updated").textContent =
      `Last updated: ${formatDate(payload.updatedAt)}`;

    renderNews(allItems);

    document.getElementById("searchBox").addEventListener("input", applyFilters);
    document.getElementById("sourceFilter").addEventListener("change", applyFilters);
  } catch (error) {
    console.error(error);
    status.innerHTML = `
      News could not be loaded right now.
      Please try again later or check the
      <a href="https://www.cdc.gov/measles/data-research/index.html" target="_blank" rel="noopener noreferrer">CDC measles page</a>.
    `;
    document.getElementById("news-grid").innerHTML = "";
  }
}

document.addEventListener("DOMContentLoaded", init);
