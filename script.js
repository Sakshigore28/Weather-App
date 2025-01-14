const form = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const weatherIcon = document.getElementById('weather-icon');

// Function to get the current date
function getCurrentDate() {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    document.getElementById('date').textContent = formattedDate;
}

// Call the function to display the date when the page loads
getCurrentDate();

// Your OpenWeatherMap API key
const apiKey = 'e91753e4b10f05095ef1f6b3babd96c2';
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            const data = await response.json();

            if (data.cod === 200) {
                cityName.textContent = data.name;
                temperature.textContent = `${data.main.temp}°C`;
                weatherDescription.textContent = data.weather[0].description;
                windSpeed.textContent = data.wind.speed;
                humidity.textContent = data.main.humidity;
                pressure.textContent = data.main.pressure;
                weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            } else {
                alert('City not found. Please try again.');
            }
        } catch (error) {
            alert('Error fetching weather data. Please try again later.');
        }
    }
});
