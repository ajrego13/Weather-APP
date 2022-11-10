
const api = {
    key: '5deb6d417370101da20915426b56543c', 
    baseURL : 'https://api.openweathermap.org/data/2.5/'
}


const button = document.getElementById('button').addEventListener('click', () => {
    return getResults()
}); 


const getResults = async () => {
    try {let query = document.getElementById('input').value
    const response = await fetch(`${api.baseURL}weather?q=${query}&units=imperial&appid=${api.key}`); 
    const weatherData = await response.json();
    console.log(query); 
    console.log(weatherData)
   changeElements(weatherData);
} catch (error) {
    alert('city not found');
}
    
}


const changeElements = (data) => {
    const cityEl = document.getElementById('city'); 
    const tempEl = document.getElementById('temp');
    const image = document.getElementById('image'); 
    const descriptionEl = document.getElementById('description'); 
    const humidityEl = document.getElementById('humidity'); 
    const windEl = document.getElementById('wind'); 
    let temperature = Math.floor(data.main.temp)
    let windSpeed = Math.floor(data.wind.speed)
   

   cityEl.innerText = 'Weather in' + " " + data.name + ',' + " " + data.sys.country;
   tempEl.innerText = temperature + '°F'
   changeImage(data); 
   descriptionEl.innerText = data.weather[0].description
   humidityEl.innerText = "Humidity: "+ data.main.humidity + "%"
   windEl.innerText = "Wind: " + windSpeed + ' ' + 'mph'

}

function changeImage (data) {
    const image = document.getElementById('image'); 
    let img = data.weather[0].icon;
    const baseImageSrc =  `http://openweathermap.org/img/wn/${img}@2x.png`
    image.src = baseImageSrc;
}



 
