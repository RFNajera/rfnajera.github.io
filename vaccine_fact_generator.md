# Vaccine Fact Generator
This is an old project, from about 4 years ago. It used to be written in an HTML file and hosted on its own website. It wasn't getting much traction, and it wasn't worth the cost of keeping the website running. But here it is.

## Instructions
First, click on "New Fact" to get a new fact. Then click on "Share This!" to share it.
The code will use your browser's universal sharing settings. If that is not available, your browser will copy the fact to your clipboard. All you have to do then is paste it wherever you want.

## Comments and Suggestions?
If you have comments and suggestions on improving this, I'm all for it.

<div class="container">
  <div class="row flex-top flex-center">
    <header class="border shadow">
      <h1>Vaccine Fact Generator</h1>
      <small>v0.9 (Last Updated 28Dec2024)</small>
    </header>
  </div>
  <div class="row flex-center" style="width: 80%;">
    <main class="card">
      <p class="quote card-body center" id="newQuoteSection">Click on "New Fact" to get a new fact!</p>
    </main>
  </div>
  <div class="row flex-center">
    <button id="newQuoteButton" class="btn-large new-quote-button" onClick="getQuote()">New Fact</button>
    <button id="shareButton" class="btn-large tweet-button" onClick="shareQuote()">Share This!</button>
  </div>

  <div class="row flex-bottom flex-center">
    <div class="card" style="width: 20rem;">
      <div class="card-body">
        <h4 class="card-title">The Vaccine Fact Generator</h4>
        <p class="card-text">Brought to you by René F. Najera, DrPH.</br>Based on code by Jay.</p>
        <a class="card-link" href="https://twitter.com/epiren">@Epiren</a><br>
        <a class="card-link" href="https://twitter.com/mrjaypeasmith">@MrJayPeaSmith</a><br>
      </div>
    </div>
  </div>
</div>

<script>
  // Quotes
  let quotes = [
    "Immunization prevents 3.5-5 million deaths every year from diseases like diphtheria, tetanus, pertussis, influenza, and measles.",
    "Global immunization efforts have saved 154 million lives over the past 50 years.",
    "Measles vaccination alone has saved nearly 94 million lives since 1974.",
    "Vaccination has enabled more than 20 million people to walk today who would otherwise have been paralyzed by polio."
  ];

  function getQuote() {
    var randomNumber = Math.floor(Math.random() * quotes.length);
    document.getElementById('newQuoteSection').innerHTML = quotes[randomNumber];
  }

  function shareQuote() {
    const generatedQuote = document.getElementById('newQuoteSection').innerHTML;

    if (navigator.share) {
      navigator.share({
        title: 'Vaccine Fact',
        text: generatedQuote,
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      alert('Your browser does not support sharing. Please copy and paste the fact manually.');
    }
  }
</script>

<style>
  header {
    padding: 1em;
    background-color: #ffff80;
    margin-top: 1em;
    text-align: center;
  }

  .quote {
    font-size: 3em;
  }

  .btn-large {
    margin: 0.5em;
  }

  #button:active {
    box-shadow: 0 0 0 0;
  }

  .card {
    text-align: center;
    width: 45em;
  }

  .new-quote-button {
    background-color: #8cff66;
  }

  .tweet-button {
    background-color: #b3e0ff;
  }
</style>
