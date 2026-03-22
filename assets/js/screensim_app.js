/* =========================================================
   Screening Test Simulator — Core Logic + Visualizations
   Pure HTML5/CSS/JS, no frameworks.
   ========================================================= */

(function () {
  "use strict";

  // ---- Theme toggle ----
  const toggle = document.querySelector("[data-theme-toggle]");
  const root = document.documentElement;
  let currentTheme = matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  root.setAttribute("data-theme", currentTheme);
  updateToggleIcon();

  toggle &&
    toggle.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", currentTheme);
      updateToggleIcon();
      // Redraw charts for theme
      updateAllCharts();
      drawConceptCharts();
    });

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.setAttribute(
      "aria-label",
      "Switch to " + (currentTheme === "dark" ? "light" : "dark") + " mode"
    );
    toggle.innerHTML =
      currentTheme === "dark"
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  // ---- Smooth scroll for nav links ----
  document.querySelectorAll('.header-nav a, a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.getElementById(href.slice(1));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // ---- Helpers ----
  function getCSS(prop) {
    return getComputedStyle(root).getPropertyValue(prop).trim();
  }

  function pct(v) {
    return (v * 100).toFixed(1) + "%";
  }

  // ---- Presets ----
  const PRESETS = {
    hepC: { prevalence: 3, sensitivity: 99, specificity: 99 },
    "flu-summer": { prevalence: 1, sensitivity: 70, specificity: 95 },
    "flu-winter": { prevalence: 20, sensitivity: 70, specificity: 95 },
    "hiv-high": { prevalence: 15, sensitivity: 99.5, specificity: 99.5 },
    mammogram: { prevalence: 1.5, sensitivity: 85, specificity: 90 },
    hivLowRisk: { prevalence: 0.4, sensitivity: 99.9, specificity: 99.8 },
    brcaMammogram: { prevalence: 55, sensitivity: 75, specificity: 93 },
  };

  // ---- Sliders & state ----
  const sliders = {
    prevalence: document.getElementById("slider-prevalence"),
    sensitivity: document.getElementById("slider-sensitivity"),
    specificity: document.getElementById("slider-specificity"),
  };
  const outputs = {
    prevalence: document.getElementById("val-prevalence"),
    sensitivity: document.getElementById("val-sensitivity"),
    specificity: document.getElementById("val-specificity"),
  };

  function getParams() {
    return {
      prevalence: parseFloat(sliders.prevalence.value) / 100,
      sensitivity: parseFloat(sliders.sensitivity.value) / 100,
      specificity: parseFloat(sliders.specificity.value) / 100,
    };
  }

  function simulate(prev, sens, spec, N) {
    N = N || 1000;
    const diseased = Math.round(N * prev);
    const healthy = N - diseased;
    const tp = Math.round(diseased * sens);
    const fn = diseased - tp;
    const tn = Math.round(healthy * spec);
    const fp = healthy - tn;
    const totalPos = tp + fp;
    const totalNeg = fn + tn;
    const ppv = totalPos > 0 ? tp / totalPos : 0;
    const npv = totalNeg > 0 ? tn / totalNeg : 0;
    return { tp, fp, fn, tn, diseased, healthy, totalPos, totalNeg, ppv, npv };
  }

  // ---- Update display ----
  function updateOutputs() {
    outputs.prevalence.textContent =
      parseFloat(sliders.prevalence.value).toFixed(1) + "%";
    outputs.sensitivity.textContent =
      parseFloat(sliders.sensitivity.value).toFixed(1) + "%";
    outputs.specificity.textContent =
      parseFloat(sliders.specificity.value).toFixed(1) + "%";
  }

  function updateTable(r) {
    document.getElementById("cell-tp").textContent = r.tp;
    document.getElementById("cell-fp").textContent = r.fp;
    document.getElementById("cell-fn").textContent = r.fn;
    document.getElementById("cell-tn").textContent = r.tn;
    document.getElementById("cell-total-pos").textContent = r.totalPos;
    document.getElementById("cell-total-neg").textContent = r.totalNeg;
    document.getElementById("cell-total-disease").textContent = r.diseased;
    document.getElementById("cell-total-healthy").textContent = r.healthy;
  }

  function updateKPIs(r) {
    document.getElementById("kpi-ppv").textContent = pct(r.ppv);
    document.getElementById("kpi-npv").textContent = pct(r.npv);
  }

  // ---- Chart instances ----
  let chartPositive = null;
  let chartNegative = null;
  let chartPPVCurve = null;

  function getChartColors() {
    return {
      tp: getCSS("--color-tp") || "#2d8a4e",
      fp: getCSS("--color-fp") || "#c23a3a",
      fn: getCSS("--color-fn") || "#b5730d",
      tn: getCSS("--color-tn") || "#0d7c83",
      primary: getCSS("--color-primary") || "#0d7c83",
      text: getCSS("--color-text") || "#1a2332",
      muted: getCSS("--color-text-muted") || "#5a6577",
      faint: getCSS("--color-text-faint") || "#9aa4b2",
      surface: getCSS("--color-surface") || "#ffffff",
      divider: getCSS("--color-divider") || "#dde1e7",
    };
  }

  function updateCharts(r) {
    const c = getChartColors();
    const chartFont = "'General Sans', sans-serif";

    // -- Positive breakdown (doughnut) --
    const posCtx = document
      .getElementById("chart-positive-breakdown")
      .getContext("2d");
    if (chartPositive) chartPositive.destroy();
    chartPositive = new Chart(posCtx, {
      type: "doughnut",
      data: {
        labels: ["True Positive", "False Positive"],
        datasets: [
          {
            data: [r.tp, r.fp],
            backgroundColor: [c.tp, c.fp],
            borderWidth: 2,
            borderColor: c.surface,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "55%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: c.muted,
              font: { family: chartFont, size: 12 },
              padding: 12,
            },
          },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                const total = r.totalPos || 1;
                const val = ctx.raw;
                return (
                  ctx.label +
                  ": " +
                  val +
                  " (" +
                  ((val / total) * 100).toFixed(1) +
                  "%)"
                );
              },
            },
          },
        },
      },
    });

    // -- Negative breakdown (doughnut) --
    const negCtx = document
      .getElementById("chart-negative-breakdown")
      .getContext("2d");
    if (chartNegative) chartNegative.destroy();
    chartNegative = new Chart(negCtx, {
      type: "doughnut",
      data: {
        labels: ["True Negative", "False Negative"],
        datasets: [
          {
            data: [r.tn, r.fn],
            backgroundColor: [c.tn, c.fn],
            borderWidth: 2,
            borderColor: c.surface,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "55%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: c.muted,
              font: { family: chartFont, size: 12 },
              padding: 12,
            },
          },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                const total = r.totalNeg || 1;
                const val = ctx.raw;
                return (
                  ctx.label +
                  ": " +
                  val +
                  " (" +
                  ((val / total) * 100).toFixed(1) +
                  "%)"
                );
              },
            },
          },
        },
      },
    });

    // -- PPV vs Prevalence curve --
    const params = getParams();
    const sens = params.sensitivity;
    const spec = params.specificity;
    const curPrev = params.prevalence;
    const curveData = [];
    for (let p = 0.001; p <= 0.5; p += 0.002) {
      const ppvVal =
        (sens * p) / (sens * p + (1 - spec) * (1 - p));
      curveData.push({ x: p * 100, y: ppvVal * 100 });
    }
    const curPPV =
      (sens * curPrev) /
      (sens * curPrev + (1 - spec) * (1 - curPrev));

    const curveCtx = document
      .getElementById("chart-ppv-curve")
      .getContext("2d");
    if (chartPPVCurve) chartPPVCurve.destroy();
    chartPPVCurve = new Chart(curveCtx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "PPV Curve",
            data: curveData,
            showLine: true,
            borderColor: c.primary,
            backgroundColor: "transparent",
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0.4,
            order: 2,
          },
          {
            label: "Current Setting",
            data: [{ x: curPrev * 100, y: curPPV * 100 }],
            pointRadius: 8,
            pointBackgroundColor: c.fp,
            pointBorderColor: c.surface,
            pointBorderWidth: 3,
            showLine: false,
            order: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            type: "linear",
            title: {
              display: true,
              text: "Prevalence (%)",
              color: c.muted,
              font: { family: chartFont, size: 12 },
            },
            min: 0,
            max: 50,
            ticks: {
              color: c.faint,
              font: { family: chartFont, size: 11 },
            },
            grid: { color: c.divider },
          },
          y: {
            title: {
              display: true,
              text: "Positive Predictive Value (%)",
              color: c.muted,
              font: { family: chartFont, size: 12 },
            },
            min: 0,
            max: 100,
            ticks: {
              color: c.faint,
              font: { family: chartFont, size: 11 },
            },
            grid: { color: c.divider },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              color: c.muted,
              font: { family: chartFont, size: 12 },
              padding: 16,
              usePointStyle: true,
            },
          },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return (
                  "Prevalence " +
                  ctx.parsed.x.toFixed(1) +
                  "% → PPV " +
                  ctx.parsed.y.toFixed(1) +
                  "%"
                );
              },
            },
          },
        },
      },
    });
  }

  // ---- Interpretation text ----
  function updateInterpretation(r, params) {
    const el = document.getElementById("interpretation-text");
    const prevPct = (params.prevalence * 100).toFixed(1);
    const sensPct = (params.sensitivity * 100).toFixed(1);
    const specPct = (params.specificity * 100).toFixed(1);
    const ppvPct = (r.ppv * 100).toFixed(1);
    const npvPct = (r.npv * 100).toFixed(1);

    let html = "";

    html +=
      '<p>In a population where <strong>' +
      prevPct +
      '%</strong> of people have the disease, ' +
      "a test with <strong>" +
      sensPct +
      "% sensitivity</strong> and <strong>" +
      specPct +
      "% specificity</strong> produces the following results for every 1,000 people tested:</p>";

    html +=
      "<p><strong>" +
      r.totalPos +
      " people test positive</strong>. Of these, <strong>" +
      r.tp +
      "</strong> truly have the disease (true positives) and <strong>" +
      r.fp +
      "</strong> do not (false positives).</p>";

    html +=
      "<p><strong>" +
      r.totalNeg +
      " people test negative</strong>. Of these, <strong>" +
      r.tn +
      "</strong> truly are disease-free (true negatives) and <strong>" +
      r.fn +
      "</strong> actually have the disease but were missed (false negatives).</p>";

    // PPV interpretation
    html +=
      '<p>The <span class="interp-highlight ppv-val">Positive Predictive Value is ' +
      ppvPct +
      "%</span>. ";
    if (r.ppv < 0.2) {
      html +=
        "This means that if you test positive, there is less than a 1 in 5 chance you actually have the disease. " +
        '<span class="interp-highlight warn">Most positive results at this prevalence are false alarms.</span> ' +
        "A confirmatory test would be essential before any diagnosis.</p>";
    } else if (r.ppv < 0.5) {
      html +=
        "This means that if you test positive, the result is more likely to be a false alarm than a true case. " +
        "Confirmatory testing is strongly recommended.</p>";
    } else if (r.ppv < 0.8) {
      html +=
        "A positive result has a moderate chance of being correct. " +
        "Confirmatory testing is still advisable to be certain.</p>";
    } else {
      html +=
        "A positive result is highly likely to be a true case. " +
        "The disease is common enough in this population that false positives are rare relative to true positives.</p>";
    }

    // NPV interpretation
    html +=
      '<p>The <span class="interp-highlight npv-val">Negative Predictive Value is ' +
      npvPct +
      "%</span>. ";
    if (r.npv > 0.99) {
      html +=
        "A negative result is extremely reassuring &mdash; it almost certainly means you do not have the disease.</p>";
    } else if (r.npv > 0.95) {
      html +=
        "A negative result is very reassuring, though a small number of cases are missed by the test.</p>";
    } else if (r.npv > 0.85) {
      html +=
        "A negative result is moderately reassuring, but some true cases are being missed. " +
        "In high-prevalence settings, a negative test may not be enough to rule out the disease.</p>";
    } else {
      html +=
        '<span class="interp-highlight warn">A negative result is not very reassuring.</span> ' +
        "The disease is common enough and/or the test misses enough cases that many people with a negative result actually have the disease.</p>";
    }

    // Seasonal / contextual note
    if (params.prevalence < 0.03 && params.sensitivity < 0.8) {
      html +=
        "<p><strong>Why this matters:</strong> When both prevalence and sensitivity are low (think influenza testing in summer), " +
        "the majority of positive tests are false positives, and the test also misses a substantial number of true cases. " +
        "In these situations, clinical judgment is more reliable than the test.</p>";
    } else if (params.prevalence > 0.15 && params.sensitivity < 0.8) {
      html +=
        "<p><strong>Why this matters:</strong> When prevalence is high but sensitivity is moderate (think influenza testing in winter), " +
        "positive results are trustworthy, but <strong>negative results should not be used to rule out disease</strong>. " +
        "The test misses too many true cases. Clinicians should treat based on symptoms even if the test is negative.</p>";
    }

    el.innerHTML = html;
  }

  // ---- Main update function ----
  function updateAllCharts() {
    updateOutputs();
    const params = getParams();
    const r = simulate(params.prevalence, params.sensitivity, params.specificity);
    updateTable(r);
    updateKPIs(r);
    updateCharts(r);
    updateInterpretation(r, params);
  }

  // ---- Wire up sliders ----
  Object.values(sliders).forEach((s) => {
    s.addEventListener("input", updateAllCharts);
  });

  // ---- Wire up presets ----
  document.querySelectorAll("[data-preset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = PRESETS[btn.dataset.preset];
      if (!p) return;
      sliders.prevalence.value = p.prevalence;
      sliders.sensitivity.value = p.sensitivity;
      sliders.specificity.value = p.specificity;
      updateAllCharts();
      // Scroll to simulator
      document
        .getElementById("simulator")
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  // ---- Concept charts (static educational) ----
  let chartConceptSens = null;
  let chartConceptSpec = null;
  let chartConceptPPV = null;
  let chartConceptNPV = null;

  function drawConceptCharts() {
    const c = getChartColors();
    const chartFont = "'General Sans', sans-serif";
    const opts = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: c.muted,
            font: { family: chartFont, size: 11 },
            padding: 8,
            boxWidth: 14,
          },
        },
        tooltip: { enabled: true },
      },
    };

    // Sensitivity
    const sensCtx = document.getElementById("chart-sensitivity").getContext("2d");
    if (chartConceptSens) chartConceptSens.destroy();
    chartConceptSens = new Chart(sensCtx, {
      type: "doughnut",
      data: {
        labels: ["True Positive (detected)", "False Negative (missed)"],
        datasets: [
          {
            data: [95, 5],
            backgroundColor: [c.tp, c.fn],
            borderWidth: 2,
            borderColor: c.surface,
          },
        ],
      },
      options: {
        ...opts,
        cutout: "50%",
      },
    });

    // Specificity
    const specCtx = document.getElementById("chart-specificity").getContext("2d");
    if (chartConceptSpec) chartConceptSpec.destroy();
    chartConceptSpec = new Chart(specCtx, {
      type: "doughnut",
      data: {
        labels: ["True Negative (correct)", "False Positive (false alarm)"],
        datasets: [
          {
            data: [95, 5],
            backgroundColor: [c.tn, c.fp],
            borderWidth: 2,
            borderColor: c.surface,
          },
        ],
      },
      options: {
        ...opts,
        cutout: "50%",
      },
    });

    // PPV — shown as bar chart comparing low vs high prevalence
    const ppvCtx = document.getElementById("chart-ppv").getContext("2d");
    if (chartConceptPPV) chartConceptPPV.destroy();
    chartConceptPPV = new Chart(ppvCtx, {
      type: "bar",
      data: {
        labels: ["Prev 1%", "Prev 5%", "Prev 20%", "Prev 50%"],
        datasets: [
          {
            label: "PPV",
            data: [16.1, 50.0, 82.6, 95.0],
            backgroundColor: c.primary,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: "PPV %",
              color: c.muted,
              font: { family: chartFont, size: 10 },
            },
            ticks: {
              color: c.faint,
              font: { family: chartFont, size: 10 },
            },
            grid: { color: c.divider },
          },
          x: {
            ticks: {
              color: c.faint,
              font: { family: chartFont, size: 10 },
            },
            grid: { display: false },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => "PPV: " + ctx.raw.toFixed(1) + "%",
            },
          },
        },
      },
    });

    // NPV — bar chart
    const npvCtx = document.getElementById("chart-npv").getContext("2d");
    if (chartConceptNPV) chartConceptNPV.destroy();
    chartConceptNPV = new Chart(npvCtx, {
      type: "bar",
      data: {
        labels: ["Prev 1%", "Prev 5%", "Prev 20%", "Prev 50%"],
        datasets: [
          {
            label: "NPV",
            data: [99.9, 99.7, 98.7, 95.0],
            backgroundColor: c.tn,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            min: 90,
            title: {
              display: true,
              text: "NPV %",
              color: c.muted,
              font: { family: chartFont, size: 10 },
            },
            ticks: {
              color: c.faint,
              font: { family: chartFont, size: 10 },
            },
            grid: { color: c.divider },
          },
          x: {
            ticks: {
              color: c.faint,
              font: { family: chartFont, size: 10 },
            },
            grid: { display: false },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => "NPV: " + ctx.raw.toFixed(1) + "%",
            },
          },
        },
      },
    });
  }

  // ---- Init ----
  drawConceptCharts();
  updateAllCharts();
})();
