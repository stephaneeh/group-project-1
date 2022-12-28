// Mauxi's API Key: 1cd51d26035378cfa296c442
// URL example https://v6.exchangerate-api.com/v6/1cd51d26035378cfa296c442/latest/USD
// var mauxiKey = 1cd51d26035378cfa296c442;

var sourceCountry = document.querySelector('#source-country');
var destinationCountry = document.querySelector('#destination-country');
var submitBtn = document.querySelector('#submit-btn');
var resultsContainer = document.querySelector('#results-container');

// put in your API KEY
fetch('https://v6.exchangerate-api.com/v6/YOUR-API-KEY/codes')
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
    fetch('https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/' + sourceCountryCode +'/'+ destinationCountryCode +'')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var result = document.createElement('p');
        result.textContent = '1 '+ sourceCountryCode +' = ' + data.conversion_rate + " " + destinationCountryCode;
        resultsContainer.append(result);
      });
      
  }

  
  submitBtn.addEventListener('click', handleButtonClick);