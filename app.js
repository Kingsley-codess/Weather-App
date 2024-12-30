const apiKey = "fccb4147420e5101dc80714c137d1cbb";

const weatherDataEl = document.getElementById("data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form")



formEl.addEventListener("submit",(event) =>{
    event.preventDefault();

    const cityValue = cityInputEl.value;

   
    getWeatherData(cityValue)

});

 async function getWeatherData (cityValue){


    try {
        // https://api.openweathermap.org/data/3.0/weather?q=${cityValue}&appid=${}&unit=metric
        // /{op}/{z}/{x}/{y}

        const respond = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

        if (!respond.ok){
             
             throw new Error("Network respond was not ok !")    

        }
        const data = await respond.json();

        const degree = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon

        const details = [
            `Feels like:  ${Math.round(data.main.feel_like)}`,
            `Humidity:${data.main.humidity}`,
            `Wind speed: ${data.wind.speed}`,
        ];

        console.log(details)
    
            weatherDataEl.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather-icon">`;

            weatherDataEl.querySelector(".degree").textContent = `${degree}°C`

            weatherDataEl.querySelector(".description").textContent = `${description}`
            weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=>
            `<div>${detail}</div>`).join("")
    } catch (error){

    }
}


