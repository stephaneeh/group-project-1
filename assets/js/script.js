//exchange rates keys
var mauxiKey = '1cd51d26035378cfa296c442';
var YanfangKey = '913440a5293f2012406cc25c';
var shKey = '9467838ba1d2eed66723ca50';

// marketAUX details
var marketKey = 'PBOJWpVm2AVpXBog3MjMLnkCiqqiw3XMXKxXcv3h';

var sourceCountryCode = '';
var destinationCountryCode = '';
var targetExchange = '';

var dateContainer = document.querySelector('#date-container');
var resultsContainer = document.querySelector('#results-container');
var sourceCountry = document.querySelector('#source-country');
var destinationCountry = document.querySelector('#destination-country');
var inputField = document.querySelector('#input-field');
var submitBtn = document.querySelector('#submit-btn');
var historyContainer = document.querySelector('#history-container');
var historyList = document.querySelector('#history-list');
var newsContainer = document.querySelector('#news-container');
var articleContainer = document.querySelector('#article-container');

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

var historyArray = JSON.parse(localStorage.getItem("historyArray")) || [];

var options = [
    {country: "Australia", code: "au", currency: "AUD", exchange: "ASX" },
    {country: "Brazil", code: "br", currency: "BRL", exchange: "BVMF" },
    {country: "Canada", code: "ca", currency: "CAD", exchange: "TSX" },
    {country: "China", code: "cn", currency: "CNY", exchange: "SSE" },
    {country: "European Union", code: "eu", currency: "EUR", exchange: "ENX" },
    {country: "Hong Kong", code: "hk", currency: "HKD", exchange: "HKEX" },
    {country: "India", code: "in", currency: "INR", exchange: "NSE" },
    {country: "Japan", code: "jp", currency: "JPY", exchange: "TYO" },
    {country: "Mexico", code: "mx", currency: "MXN", exchange: "BMV" },
    {country: "New Zealand", code: "nz", currency: "NZD", exchange: "NZX" },
    {country: "Phillipines", code: "ph", currency: "PHP", exchange: "PHS" },
    {country: "South Africa", code: "za", currency: "ZAR", exchange: "JSE" },
    {country: "Switzerland", code: "ch", currency: "CHF", exchange: "SWX" },
    {country: "United Kingdom", code: "gb", currency: "GBP", exchange: "LSE" },
    {country: "United States", code: "us", currency: "USD", exchange: "NYSE" },
];


$(document).ready(function(){
  $('.parallax').parallax();
});

$(document).ready(function(){
  $('select').formSelect();
});

var getList = function () { 
  //load options into dropdown list
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
  //load date to page
  var now = dayjs().format('dddd D MMM, YYYY');
  dateContainer.textContent = now;
};

var loadHistory = function () {
  historyList.innerHTML= '';  
  
  for (var i = 0; i < historyArray.length; i++) {
        var liEl = document.createElement('li');
        liEl.textContent = historyArray[i].conversion + " - " + historyArray[i].rate;

        historyList.appendChild(liEl);
    }
  };


function handleButtonClick(event){
  // event.preventDefault();  

    sourceCountryCode = sourceCountry.value.split('-')[0];
    destinationCountryCode = destinationCountry.value.split('-')[0];
    targetExchange = destinationCountry.value.split('-')[1];

    //modal to appear if input field is empy
    if (!inputField.value) {
      modal.style.display = "block";
      //on select the close button
      span.onclick = function() {
        modal.style.display = "none";
      }
      return;
    } else {

    //API to fetch results for exchange rates
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

        // localStorage.setItem(sourceCountryCode +' to '+ destinationCountryCode, data.conversion_rate);
        var history = {
          conversion: sourceCountryCode +' to '+ destinationCountryCode,
          rate: data.conversion_rate,
        };
          
        if (historyArray.length < 5) {
          historyArray.push(history);
        } else {
      historyArray.push(history);
      historyArray.shift();
        }
      localStorage.setItem("historyArray", JSON.stringify(historyArray));
      })
    .then(function(){loadHistory()}) 

    };
    
    var marketNewsURL = 'https://api.marketaux.com/v1/news/all?exchanges=' + targetExchange + '&filter_entities=true&language=en&limit=3&published_after=2022-12-29T02:24&api_token=' + marketKey;


    //API to fetch results for exchange rates
    fetch(marketNewsURL)
    .then(function (newsResponse) {
      if (newsResponse.ok) {
        newsResponse.json().then(function(data) {

          console.log(marketNewsURL);
          console.log(data);
          articleContainer.innerHTML= '';

          // var articleList = document.createElement('ul');
          // articleContainer.appendChild(articleList);

          for (var i = 0; i < data.data.length; i++) {
            var articleTitle = document.createElement('h5');
            articleTitle.setAttribute('id', 'news-style');
            articleTitle.textContent = data.data[i].title;
            articleTitle.style = 'font-weight: bold';
            articleContainer.append(articleTitle);

            var articleSnippet = document.createElement('p');
            articleSnippet.textContent = data.data[i].snippet;
            articleSnippet.style = 'font-weight: normal';
            articleTitle.appendChild(articleSnippet);

            var articleURL = document.createElement('a');
            articleURL.textContent = 'Read more...';
            articleURL.setAttribute('href', data.data[i].url);
            articleTitle.appendChild(articleURL);
          }
        })
      }
     })
    };

submitBtn.addEventListener('click', handleButtonClick);

//Loads the available options in the drop down lists
getList();
loadHistory();