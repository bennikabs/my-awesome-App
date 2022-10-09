let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
  "December",
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let nowdate = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

console.log(now.getHours());
console.log(now.getMinutes());

let currentDate = document.querySelector("#week-day");
currentDate.innerHTML = `${day} ${nowdate} ${month}  ${hours}:${minutes}`;

function displayFahrenheiTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tem-perat");
  celsiusButton.classList.remove("degreeLink");
  fahrenheitButton.classList.add("degreeLink");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusButton.classList.add("degreeLink");
  fahrenheitButton.classList.remove("degreeLink");
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#tem-perat");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", displayFahrenheiTemperature);
let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", displayCelsiusTemperature);

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#tem-perat").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response);
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let celsiusTemperature = null;

function searchCity(city) {
  let apiKey = "c68d952d49c1f7b73f7353b16aa88d42";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function findCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city");
  let cityInput = document.querySelector("#enterCity");
  console.log(searchCity);
  currentCity.innerHTML = cityInput.value;

  searchCity(cityInput.value);
}

function searchLocation(position) {
  let apiKey = "c68d952d49c1f7b73f7353b16aa88d42";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let search = document.querySelector("#search-form");
search.addEventListener("submit", findCity);
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("Berlin");
