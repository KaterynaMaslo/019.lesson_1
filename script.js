const API = 'http://api.openweathermap.org/data/2.5/weather?q='; //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const cityName = document.querySelector("#cityName");
const button = document.querySelector("#buttonSearch");
const body = document.querySelector('body')

async function controller(city){
    try{
        const request = await fetch(`${API}${city}&APPID=5d066958a60d315387d9492393935c19`);
        const data = await request.json();

        return data;
    }
    catch(err){
        console.log(err);
    }
}

async function getWeather(city){
    try{
        const data = await controller(city);
        renderWeather(data);
    }
    catch(err){
        console.log(err);
    }
}

function renderWeather(city){
    const ul = document.createElement('ul');
    const nameCity = document.createElement('li');
    const temp = document.createElement('li');
    const pressure = document.createElement('li');
    const description = document.createElement('li');
    const humidity = document.createElement('li');
    const speed = document.createElement('li');
    const deg = document.createElement('li');
    const icon = document.createElement('img');

    nameCity.innerText = city.name;
    temp.innerText = `Temp: ${city.main.temp}`;
    pressure.innerText = `Pressure: ${city.main.pressure}`;
    description.innerText = `${city.weather[0].description}`;
    humidity.innerText = `Humidity: ${city.main.humidity}`;
    speed.innerText = `Speed: ${city.wind.speed}`;
    deg.innerText = `Deg: ${city.wind.deg}`;
    icon.src = `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;

    ul.append(nameCity, temp, pressure, description, humidity, deg, icon);
    body.append(ul);
}

button.addEventListener("click", () => {
    const cityNameValue = cityName.value;
    getWeather(cityNameValue);
})