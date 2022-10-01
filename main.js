
const apiKey = '02cf8661e37f0f310487227e38ad0e15';
const EnterKey = "Enter";

const searchBar = document.querySelector("#searchBarValue");
const AreaData = document.querySelector("#AreaData");
const TempData = document.querySelector("#TempData");
const Humidity = document.querySelector("#HumidityData");
const Longitude = document.querySelector("#LongitudeData");
const Latitude = document.querySelector("#LatitudeData");
const weatherIcon = document.querySelector("#weatherIcon");
const weatherDescription = document.querySelector("#weatherDescription");
const background = document.querySelector(".background");


const weatherBackgroundMap = new Map([
    ["clear sky", "clearSkyImage"],
    ["light rain", "rainImage"],
    ["shower rain", "rainImage"],
    ["rain", "heavyRainImage"],
    ["light intensity drizzle", "rainImage"],
    ["heavy intensity rain", "heavyRainImage"],
    ["thunderstorm", "thunderstormImage"],
    ["snow", "snowImage"],
    ["mist", "mistyImage"],
    ["few clouds", "fewcloudsImage"],
    ["scattered clouds", "cloudsImage"],
    ["broken clouds", "cloudsImage"],
    ["overcast clouds", "overcastcloudsImage"]
]);


searchBar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        fetchWeather(searchBar.value);
    }
});

async function displayWeatherInfo(jsonData) {
    const { name } = jsonData;
    const { temp, humidity } = jsonData.main;
    const { icon, description } = jsonData.weather[0];

    AreaData.innerText = `${name}`;
    TempData.innerText = ` ${temp} °C`;
    Humidity.innerText = `${humidity}% humidity`;
    weatherDescription.innerText = `${description}`;
    let iconImage =  await fetch("https://openweathermap.org/img/wn/" + icon + ".png");
    weatherIcon.src = iconImage.url;

    let backgroundImageToRender = weatherBackgroundMap.get(description);

    if (backgroundImageToRender) {
        background.style.background = `url(assets/${backgroundImageToRender}.png)`;
        background.style.backgroundRepeat = "no-repeat";
        background.style.backgroundSize = "cover";

    } else {
        console.log("cannot find relevant weather background Image to render");
        background.style.background = `url(assets/background.png)`;
        background.style.backgroundRepeat = "no-repeat";
        background.style.backgroundSize = "cover";
    }
}

async function fetchWeather(city) {

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        const json = await response.json();
        displayWeatherInfo(json);
    }
    catch (err) {
        console.log(err);
        alert("could not retrieve city data. Please search for another location");
    }
}


document.querySelector("#searchButton").addEventListener("click", function () {
    const val = searchBar.value;
    fetchWeather(val);
});