//exchange rates keys
var mauxiKey = '1cd51d26035378cfa296c442';
var YanfangKey = '913440a5293f2012406cc25c';
var shKey = '9467838ba1d2eed66723ca50';

// marketAUX details
var marketKey = 'PBOJWpVm2AVpXBog3MjMLnkCiqqiw3XMXKxXcv3h';
var marketNewsURL = 'https://api.marketaux.com/v1/news/all?exchanges=NYSE&filter_entities=true&limit=3&published_after=2022-12-29T02:24&api_token=' + marketKey;


var sourceCountry = document.querySelector('#source-country');
var destinationCountry = document.querySelector('#destination-country');
var submitBtn = document.querySelector('#submit-btn');
var resultsContainer = document.querySelector('#results-container');
var inputField = document.querySelector('#input-field');
var newsContainer = document.querySelector('#news-container');

// TODO: add an API KEY to test your code
fetch('https://v6.exchangerate-api.com/v6/'+ shKey +'/codes')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
   
    for (var i = 0; i < data.supported_codes.length; i++) {
        var sourceCountryCode = document.createElement('option');
        sourceCountryCode.textContent = data.supported_codes[i][1];
        sourceCountryCode.setAttribute("value", data.supported_codes[i][0]);
        sourceCountry.append(sourceCountryCode);

        var destinationCountryCode = document.createElement('option');
        destinationCountryCode.textContent = data.supported_codes[i][1];
        destinationCountryCode.setAttribute("value", data.supported_codes[i][0]);
        destinationCountry.append(destinationCountryCode);
    }

  });


  function handleButtonClick(event){
    var sourceCountryCode = sourceCountry.value;
    var destinationCountryCode = destinationCountry.value;
    //put in your API KEY
    fetch('https://v6.exchangerate-api.com/v6/'+ shKey +'/pair/' + sourceCountryCode +'/'+ destinationCountryCode +'')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var inputValueResult = document.createElement('p');
        var inputValue =inputField.value;
        var inputResult =inputValue*data.conversion_rate;
        inputValueResult.textContent = inputValue + ' ' + sourceCountryCode +' = ' + inputResult + " " + destinationCountryCode;
        resultsContainer.append(inputValueResult);
       
        var DollarResult = document.createElement('p');
        DollarResult.innerHTML= '';
        DollarResult.textContent = '1 '+ sourceCountryCode +' = ' + data.conversion_rate + " " + destinationCountryCode;
        resultsContainer.append(DollarResult);
      });
    

  }

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




  submitBtn.addEventListener('click', handleButtonClick);