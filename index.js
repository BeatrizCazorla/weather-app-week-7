// feature 1
let now = new Date();

function formatDate() {
  let date = now.getDate();
  let year = now.getFullYear();

  let daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  let day = daysOfTheWeek[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[now.getMonth()];

  return ` ${day}, ${month} ${date}, ${year}`;
}

let currentDate = document.querySelector("#date");
currentDate.innerHTML = formatDate(now);

function formatTime(time) {
  let hour = now.getHours();
  let minute = now.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
    return `${hour}: ${minute}`;
  }
}

let currentTime = document.querySelector("#time");
currentTime.innerHTML = formatTime(now);

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

 return days[day];

}

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  
  let forecastHTML = `<div class = "row">`;
  
  forecast.forEach(function(forecastDay, index){
    if(index < 6){
    forecastHTML =
    forecastHTML + 
    
    `<div class = "col-2">
     <div class = "weather-forecast">
    <div class = "weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    ${index}
    <img src = "https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
    alt = ""
    width="50"
    />
    <div class = "weather-min-max-temperatures">
    <span class = "weather-forecast-max-temp">${Math.round(forecastDay.temp.max)}°</span>
    <span class = "weather-forecast-min-temp">${Math.round(forecastDay.temp.min)}°</span>
    </div>
    
</div>
</div>`;
}
  });
  
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "ca064a33594039c83e60c3ec3180633b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?
  lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#atmosphere").innerHTML =
    response.data.weather[0].main;

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
    getForecast(response.data.coord);
  
}

function search(city) {
  let apiKey = "ca064a33594039c83e60c3ec3180633b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}


function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}


function searchLocation(position) {
  let apiKey = "ca064a33594039c83e60c3ec3180633b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?
    &lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#geolocation");
currentLocationButton.addEventListener("click", getLocation);

function toFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9 ) / 5 + 32;  
  temperatureElement.innerHTML =  Math.round(fahrenheitTemperature);

  
}

function toCelsius(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", toFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", toCelsius);


search("São Paulo");
displayForecast();