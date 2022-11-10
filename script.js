
const api = {
    key: '5deb6d417370101da20915426b56543c', 
    baseURL : 'https://api.openweathermap.org/data/2.5/'
}

const searchbox = document.querySelector('.search-box')
searchbox.addEventListener('keypress', setQuery); 

function setQuery (evt) {
    evt.keyCode == 13 ? getResults(searchbox.value) : ''
    
}

const getResults = async (query) => {
    const response = await fetch(`${api.baseURL}weather?q=${query}&units=imperial&appid=${api.key}`); 
    const weatherData = await response.json();
    console.log(query); 
    sessionStorage.setItem('location', query); 
   
    changeImage(weatherData);
    changeMain(weatherData)
    changeTemp(weatherData)
    changeDesc(weatherData)
    changeLocation(weatherData)
}

const savedLocations = () => {
    const mainDiv = document.getElementById('mainEl'); 
   let newDiv = document.createElement('div'); 
   let oldLocations = sessionStorage.getItem('location')
   console.log(oldLocations)
   newDiv.innerText = 'Previous Searched Location:' + " " + oldLocations;
   newDiv.id = 'newDiv'
   
   newDiv.style.alignItems = 'center';
   newDiv.style.padding = '5px'
   newDiv.style.border = '1px solid'
   newDiv.style.borderRadius = '25px'
   newDiv.style.backgroundColor = 'lightblue'
   newDiv.style.alignItems = 'center'

   mainDiv.append(newDiv); 

   newDiv.addEventListener('click', () => {
    getResults(oldLocations)
   })
}

window.addEventListener('load', (event) => {
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(setPosition) : ''; 
    savedLocations();
})


const setPosition = async (position) => {
    const latitude = await position.coords.latitude;
    const longitude = await position.coords.longitude; 
    return getWeatherFunc(latitude, longitude);
}


const getWeatherFunc = async (lat, lon) => {
  const response = await fetch(`${api.baseURL}weather?lat=${lat}&lon=${lon}&appid=${api.key}&units=imperial`); 
  const weatherData = await response.json();
  console.log(weatherData);
  changeImage(weatherData);
  changeMain(weatherData)
  changeTemp(weatherData)
  changeDesc(weatherData)
  changeLocation(weatherData)
}


function changeImage (data) {
    const image = document.getElementById('image'); 
    let img = data.weather[0].icon;
    const baseImageSrc =  `http://openweathermap.org/img/wn/${img}@2x.png`
    image.src = baseImageSrc;
}

function changeMain (data) {
    const main = document.getElementById('main'); 
    let mainData = data.weather[0].main; 
    main.innerText = mainData;
}

function changeTemp (data) {
    const tempEl = document.getElementById('temp');
    let temperature = data.main.temp; 
    let roundedTemp = Math.floor(temperature)
    temp.innerText = roundedTemp;
}

function changeDesc (data) {
    const descriptionEl = document.getElementById('description'); 
    let descript = data.weather[0].description;
    descriptionEl.innerText = descript;
}
 
function changeLocation (data) {
    const locationEl = document.getElementById('location'); 
    let locationData = data.name; 
    locationEl.innerText = locationData;
}