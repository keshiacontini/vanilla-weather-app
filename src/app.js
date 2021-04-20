
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let number = date.getDate();
    let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
            ];
   let day = days[date.getDay()];

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
   let month = months[date.getMonth()];   



   return `${day} ${number} ${month}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
            "Sun",
            "Mon",
            "Tues",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
            ];
    return days[day];
}

function displayForecast(response) {

    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    //let weekday = ["Sun", "Mon", "Tues", "Wed", "Thurs"];
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
        forecastHTML = forecastHTML + `
                                <div class="col-2">
                                    <div class="weather-forecast-day">
                                    ${formatDay(forecastDay.dt)}</br>
                                    </div>
                                        <img 
                                            src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
                                            alt="" 
                                            width="45"/>
                                    <div class="weather-forecast-temperature">
                                        <span class="forecast-min">
                                        ${Math.round(forecastDay.temp.min)}˚
                                        </span>
                                        <span class="forecast-max">
                                        ${Math.round(forecastDay.temp.max)}˚ 
                                        </span>
                                    </div> 
                                </div>`;}
    })
    
    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    //console.log(coordinates);
    let apiKey = "7c9392b6da6881615112ab3cb5f8a411";
    let apiUrl =  `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}


function displayTemperature(response) {
    //console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#currentCondition");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celciusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celciusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt *1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)

    getForecast(response.data.coord);
}

function search(city) {
    
    let apiKey = "7c9392b6da6881615112ab3cb5f8a411";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault()
    let cityInputElement = document.querySelector("#city-input")
    search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
    //remove active class
    celcius.classList.remove("active");
    fahrenheit.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
    event.preventDefault();
    celcius.classList.add("active");
    fahrenheit.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit); 

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature)

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", displayCelciusTemperature)

search("Melbourne");
