function fetchWeatherData() {
    const lat = document.getElementById('latitude').value;
    const lon = document.getElementById('longitude').value;

    if (lat === '' || lon === '') {
        alert('Please enter both latitude and longitude.');
        return;
    }
    fetch(`http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data, lat, lon);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayError();
        });
}

function displayWeather(data, lat, lon) {
    if (data && data.dataseries) {
        const locationDiv = document.getElementById('location');
        const tempDiv = document.getElementById('temp');
        const descDiv = document.getElementById('desc');

        const firstEntry = data.dataseries[0];

        locationDiv.textContent = `Location: [${lat}, ${lon}]`;
        tempDiv.textContent = `Temp: ${firstEntry.temp2m} °C`;
        descDiv.textContent = `Desc: ${firstEntry.weather}`;
    } else {
        displayError();
    }
}

function displayError() {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = '<p>Unable to fetch weather data at this time.</p>'
}