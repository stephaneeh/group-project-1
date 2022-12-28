var sourceCountry = document.querySelector('#source-country');
var destinationCountry = document.querySelector('#destination-country');


fetch('https://v6.exchangerate-api.com/v6/YOUR-API-KEY/codes')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
   
    for (var i = 0; i < 163; i++) {
    var CountryCode = document.createElement('option');
    CountryCode.textContent = data.supported_codes[i];
    sourceCountry.append(CountryCode);
    }
  });

  fetch('https://v6.exchangerate-api.com/v6/YOUR-API-KEY/codes')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
   
    for (var i = 0; i < 163; i++) {
    var CountryCode = document.createElement('option');
    CountryCode.textContent = data.supported_codes[i];
    destinationCountry.append(CountryCode);
    }
  });