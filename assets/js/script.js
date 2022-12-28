var sourceCountry = document.querySelector('#source-country');
var destinationCountry = document.querySelector('#destination-country');


fetch('https://v6.exchangerate-api.com/v6/YOUR-API-KEY/codes')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
   
    for (var i = 0; i < 163; i++) {
        var sourceCountryCode = document.createElement('option');
        sourceCountryCode.textContent = data.supported_codes[i];
        var destinationCountryCode = document.createElement('option');
        destinationCountryCode.textContent = data.supported_codes[i];
        sourceCountry.append(sourceCountryCode);
        destinationCountry.append(destinationCountryCode);
    }

  });

