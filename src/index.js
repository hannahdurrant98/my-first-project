//date-time
let now = new Date();
let h1 = document.querySelector("h1");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
if (day < 10) {
  day = `${day}0`;
}
let date = now.getDate();
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
let year = now.getFullYear();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let hour = now.getHours();
h1.innerHTML = `${day} ${date} ${month} ${year} <br/> ${hour}:${minute}`;

//to celsius
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 18;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//to fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 25;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

//search engine
function presentCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let showCity = document.querySelector("#showCity");
  let h5 = document.querySelector("h4");
  if (searchInput.value) {
    showCity.innerHTML = `${searchInput.value}`;
  } else {
    h5.innerHTML = `Please enter a city`;
  }
  searchCity(searchInput.value);
}
function searchCity(city) {
  let apiKey = "90d9f85b35ad3264503f92b46676dc6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", presentCity);

function showTemperature(response) {
  let tempResponse = Math.round(response.data.main.temp);
  let humidReponse = Math.round(response.data.main.humidity);
  let windResponse = Math.round(response.data.wind.speed);
  let discription = response.data.weather[0].description;
  let currentCity = document.querySelector("#showCity");
  let presentTemp = document.querySelector("#current-temperature");
  let showHumid = document.querySelector("#humidity");
  let showWind = document.querySelector("#wind");
  let showDiscribe = document.querySelector("h6");
  presentTemp.innerHTML = `${tempResponse}`;
  currentCity.innerHTML = ` ${response.data.name}`;
  showHumid.innerHTML = `Humidity: ${humidReponse}%`;
  showWind.innerHTML = `Wind Speed: ${windResponse}`;
  showDiscribe.innerHTML = `${discription}`;
}

function getCurrentPosition(position) {
  let lon = console.log(position.coords.longitude);
  let lat = console.log(position.coords.latitude);
  let apiKey = "90d9f85b35ad3264503f92b46676dc6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}
let button = document.querySelector("#location");
button.addEventListener("click", retrievePosition);
