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
    fetch(`/worker?city=${city}`)
        .then(response => response.json())
        .then(data => {
            const weatherIcon = document.getElementById(`weather-${city}`);
            const weatherCondition = data.current.condition.text.toLowerCase();
            
            if (weatherCondition.includes("sunny")) weatherIcon.src = "icons/sunny.png";
            else if (weatherCondition.includes("rain")) weatherIcon.src = "icons/rainy.png";
            else if (weatherCondition.includes("wind")) weatherIcon.src = "icons/windy.png";
            else if (weatherCondition.includes("cloud")) weatherIcon.src = "icons/cloudy.png";
            else if (weatherCondition.includes("snow")) weatherIcon.src = "icons/snowy.png";
        });
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
