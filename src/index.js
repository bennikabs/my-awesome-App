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

let celsiusButton = document.querySelector("#celsius");

function celsius() {
  let currentValue = document.querySelector("#tem-perat");
  currentValue.innerHTML = `16°C`;
}

celsiusButton.addEventListener("click", celsius);

let fahrenheitButton = document.querySelector("#fahrenheit");

function fahrenheit() {
  let currentValue = document.querySelector("#tem-perat");
  currentValue.innerHTML = `83°C`;
}
fahrenheitButton.addEventListener("click", fahrenheit);

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#tem-perat").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response);

  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].description;
}

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
