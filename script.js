const cities = ["New York", "London", "Tokyo", "Sydney", "Paris"];
const mainTimeInput = document.getElementById("main-time");
const clocksContainer = document.getElementById("clocks-container");

function createClockWidget(city) {
    const widget = document.createElement("div");
    widget.classList.add("clock-widget");
    widget.innerHTML = `
        <h3>${city}</h3>
        <canvas id="clock-${city}" width="100" height="100"></canvas>
        <p id="date-${city}"></p>
        <img class="weather-icon" id="weather-${city}" src="" alt="">
    `;
    clocksContainer.appendChild(widget);
}

function fetchWeather(city) {
    fetch(`https://worker.cdntest.workers.dev/?city=${city}`)
        .then(response => response.json())
        .then(data => {
            const weatherCondition = data.current.condition.text.toLowerCase();
            const weatherIcon = document.getElementById(`weather-${city}`);
            
            // Determine the weather based on the condition text
            if (weatherCondition.includes("sunny")) {
                weatherIcon.src = "icons/sunny.png";
            } else if (weatherCondition.includes("clear")) {
                weatherIcon.src = "icons/clear.png"; // Use a clear icon for "Clear"
            } else if (weatherCondition.includes("rain")) {
                weatherIcon.src = "icons/rainy.png";
            } else if (weatherCondition.includes("wind")) {
                weatherIcon.src = "icons/windy.png";
            } else if (weatherCondition.includes("cloud")) {
                weatherIcon.src = "icons/cloudy.png";
            } else if (weatherCondition.includes("snow")) {
                weatherIcon.src = "icons/snowy.png";
            } else {
                weatherIcon.src = "icons/default.png"; // Default icon for unknown conditions
            }
        })
        .catch(error => console.error("Error fetching weather data:", error));
}


function updateClocks() {
    const selectedTime = new Date(mainTimeInput.value || new Date());
    
    cities.forEach(city => {
        const cityDate = new Date(selectedTime);
        document.getElementById(`date-${city}`).textContent = cityDate.toLocaleDateString();
        fetchWeather(city);
    });
}

mainTimeInput.addEventListener("change", updateClocks);

cities.forEach(city => createClockWidget(city));
updateClocks();
