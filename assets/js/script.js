//exchange rates keys
var mauxiKey = '1cd51d26035378cfa296c442';
var YanfangKey = '913440a5293f2012406cc25c';
var shKey = '9467838ba1d2eed66723ca50';

var baseCurrency = '';
var targetCurrency = '';
var targetExchange = '';

var sourceCountry = document.querySelector('#source-country');
var destinationCountry = document.querySelector('#destination-country');
var submitBtn = document.querySelector('#submit-btn');
var resultsContainer = document.querySelector('#results-container');
var inputField = document.querySelector('#input-field');
var newsContainer = document.querySelector('#news-container');

var options = [
    {country: "Australia", code: "au", currency: "AUD", exchange: "ASX" },
    {country: "Brazil", code: "br", currency: "BRL", exchange: "BVMF" },
    {country: "Canada", code: "ca", currency: "CAD", exchange: "TSX" },
    {country: "China", code: "cn", currency: "CNY", exchange: "SSE" },
    {country: "European Union", code: "eu", currency: "EUR", exchange: "ENX" },
    {country: "Honk Kong", code: "hk", currency: "HKD", exchange: "HKEX" },
    {country: "India", code: "in", currency: "INR", exchange: "NSE" },
    {country: "Japan", code: "jp", currency: "JPY", exchange: "TYO" },
    {country: "Mexio", code: "mx", currency: "MXN", exchange: "BMV" },
    {country: "New Zealand", code: "nz", currency: "NZD", exchange: "NZX" },
    {country: "Phillipines", code: "ph", currency: "PHP", exchange: "PHS" },
    {country: "South Africa", code: "za", currency: "ZAR", exchange: "JSE" },
    {country: "Switzerland", code: "ch", currency: "CHF", exchange: "SWX" },
    {country: "United Kingdon", code: "gb", currency: "GBP", exchange: "LSE" },
    {country: "United States", code: "us", currency: "USD", exchange: "NYSE" },
];

var getList = function () {
    for (var i = 0; i < options.length; i++) {
        var sourceCountryCode = document.createElement('option');
        sourceCountryCode.textContent = options[i].country + " - " + options[i].currency;
        sourceCountryCode.setAttribute('value', options[i].currency + '-' + options[i].code);
        sourceCountry.append(sourceCountryCode);

        var destinationCountryCode = document.createElement('option');
        destinationCountryCode.textContent = options[i].country + " - " + options[i].currency;
        destinationCountryCode.setAttribute('value', options[i].currency + '-' + options[i].exchange);
        destinationCountry.append(destinationCountryCode);
    };
    
};

function handleButtonClick(event){
    //get currency of selected countries
    sourceCountryCode = sourceCountry.value.split('-')[0];
    destinationCountryCode = destinationCountry.value.split('-')[0];
    targetExchange = destinationCountry.value.split('-')[1];

    console.log(targetExchange);

    //put in your API KEY
    fetch('https://v6.exchangerate-api.com/v6/'+ shKey +'/pair/' + sourceCountryCode +'/'+ destinationCountryCode +'')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        resultsContainer.innerHTML= '';
        var inputValueResult = document.createElement('p');
        var inputValue =inputField.value;
        var inputResult =inputValue*data.conversion_rate;
        inputValueResult.textContent = inputValue + ' ' + sourceCountryCode +' = ' + inputResult + " " + destinationCountryCode;
        resultsContainer.append(inputValueResult);
       
        var DollarResult = document.createElement('p');
        DollarResult.textContent = '1 '+ sourceCountryCode +' = ' + data.conversion_rate + " " + destinationCountryCode;
        resultsContainer.append(DollarResult);
      });


      // marketAUX details
    var marketKey = 'PBOJWpVm2AVpXBog3MjMLnkCiqqiw3XMXKxXcv3h';
    var marketNewsURL = 'https://api.marketaux.com/v1/news/all?exchanges=' + targetExchange + '&filter_entities=true&limit=3&published_after=2022-12-29T02:24&api_token=' + marketKey;

    console.log(marketNewsURL);

      // This is the code for the news results, to be based on destination, should eventually fall under the button function
      fetch(marketNewsURL)
      .then(function (newsResponse) {
        if (newsResponse.ok) {
          newsResponse.json().then(function(data) {
            console.log(data)

            var articleContainer = document.createElement('article');
            newsContainer.appendChild(articleContainer);

            var articleList = document.createElement('ul');
            articleContainer.appendChild(articleList);

            for (var i = 0; i < data.data.length; i++) {
            var articleTitle = document.createElement('li');
            articleTitle.textContent = data.data[i].title;
            articleList.appendChild(articleTitle);

            var articleSnippet = document.createElement('p');
            articleSnippet.textContent = data.data[i].snippet;
            articleTitle.appendChild(articleSnippet);

            var articleURL = document.createElement('p');
            articleURL.textContent = "Read more";
            articleURL.setAttribute("href", data.data[i].url);
            articleTitle.appendChild(articleURL);
            }
          })
        }
      });
};





submitBtn.addEventListener('click', handleButtonClick);

getList();








