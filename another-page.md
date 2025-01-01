# Vaccine Fact Generator

Welcome to the Vaccine Fact Generator. This is a work in progress. The functioning version can be found [here](https://rfnajera.github.io/vaccine_fact_generator.html). But you can try new functionalities on this page as I continue to develop it.

## Instructions

Click on "New Fact" to get a random vaccine fact. Then click on "Share It" to, you know, share it. What happens here is the code will use your browser's universal sharing abilities to ask you where to share the fact. If you don't have that capability on your browser, the fact will be copied to your clipboard for you to use.

## Caveats

I tried my best to make sure all the facts were accurate. If you see anything that is inaccurate, let me know. Also, there are only four (4) facts in this demo. The [deployed app](https://rfnajera.github.io/vaccine_fact_generator.html) contains 50 facts.

## Have fun!

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

[Back Home](./)
