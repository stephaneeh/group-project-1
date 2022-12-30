var mauxiKey = '1cd51d26035378cfa296c442';
var YanfangKey = '913440a5293f2012406cc25c';
// ---- TODO: add your key in a var :) ---- //

var sourceCountry = document.querySelector('#source-country');
var destinationCountry = document.querySelector('#destination-country');
var submitBtn = document.querySelector('#submit-btn');
var resultsContainer = document.querySelector('#results-container');
var inputField = document.querySelector('#input-field');

// TODO: add an API KEY to test your code
fetch('https://v6.exchangerate-api.com/v6/'+ YanfangKey +'/codes')
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
    fetch('https://v6.exchangerate-api.com/v6/'+ YanfangKey +'/pair/' + sourceCountryCode +'/'+ destinationCountryCode +'')
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


  submitBtn.addEventListener('click', handleButtonClick);