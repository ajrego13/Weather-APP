
const api = {
    key: '5deb6d417370101da20915426b56543c', 
    baseURL : 'https://api.openweathermap.org/data/2.5/'
}



//querys the API using the device's geolocation
window.onload =  () => {
    navigator.geolocation.getCurrentPosition(getResultsWithGeo);
  
}

// callback function for geolocation function to fetch data from API
const getResultsWithGeo = async (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude ;
    const response = await fetch(`${api.baseURL}weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${api.key}`); 
    const weatherData = await response.json(); 
    changeElements(weatherData); 
   }

// this section querys the API using the searchbox
 const button = document.getElementById('button').addEventListener('click', () => {
    return getResults()
}); 

const getResults = async () => {
   try {
        let query = document.getElementById('input').value
        const response = await fetch(`${api.baseURL}weather?q=${query}&units=imperial&appid=${api.key}`); 
        const weatherData = await response.json();
        changeElements(weatherData);
    } catch (error) {
    alert('city not found, please make sure you follow this format...city, state');
}
    
}

// dynamically changing the UI based on Fetched Data
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
    const baseImageSrc =  `http://openweathermap.org/img/wn/${img}@2x.png`;
    image.src = baseImageSrc;
}