//dom el-s
const nameS   = document.getElementById('name'),
    focusS    = document.getElementById('focus'),
    time      = document.getElementById('time'),
    greeting  = document.getElementById('greeting'),
    hDate     = document.getElementById('date'),
    hBody     = document.getElementById('body'),
    quote     = document.getElementById('quote'),
    city      = document.querySelector('.city'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description');

let date = new Date(),
    picture = date.getHours();


function getZ(num){
    if ((num <= 9) && (num >= 0)){
        num = '0' + num;
    }
    return num;
}

// function setOpacity() {
//     var op = 1;
//     setTimeout(function func() {
//         if (op < 0)
//             return;
//         hBody.style.backgroundImage.opacity = op;
//         op -= 0.1;
//         setTimeout (func, 1000);
//     }, 1000);    
// }

function getCity(){
    if (localStorage.getItem('city') === null){
        city.textContent = 'Minsk';
    }else{
        city.textContent = localStorage.getItem('city');
    }
}

function setCity(param) {
    if (param.type === 'keypress'){
        if (param.which == 13 || param.keyCode == 13) {
            if ((city.textContent == '')){
                getCity();
                city.blur();
            }else{
                localStorage.setItem('city', param.target.innerText);
                setWeather();
                city.blur();
            }
          }
    }else if (param.type === 'focus'){
        param.target.innerText = '';
    }else{
        getCity();
    }
}

async function setWeather(){
    let url;
    if (localStorage.getItem('city') === null){
        url = 'https://api.openweathermap.org/data/2.5/weather?q='+city.textContent+'&lang=en&appid=708486a6489e9d16d149e53a5ea5b5bd&units=metric';
    }else{
        smth = localStorage.getItem('city');
        url = 'https://api.openweathermap.org/data/2.5/weather?q='+smth+'&lang=en&appid=708486a6489e9d16d149e53a5ea5b5bd&units=metric';
    }
    try {
        const response = await fetch(url);
        const data = await response.json();

        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
      } catch (error) {
        alert('Error: city does not exist in database')
        temperature.textContent = ``;
        weatherDescription.textContent = '';
        localStorage.setItem('city', 'Minsk');
        console.log(error);
      }
}

function setBackground(imgN){
    if (imgN == undefined){
        let date = new Date(),
            hour = date.getHours();

        hBody.style.backgroundImage = `url(./images/${hour}.jpg)`;
    }else{
        hBody.style.backgroundImage = `url(./images/${imgN}.jpg)`;
    }
}

async function setQuote() {
    try {
      const url = 'https://favqs.com/api/qotd';
      const response = await fetch(url);
      const data = await response.json();
      quote.textContent = data.quote.body;
    } catch (error) {
      console.log(error);
    }
}

document.addEventListener("click",  function(e) {
    if (e.target.className=="myButtonQ") {
        setQuote();
    }
    
    if (e.target.className=="myButton") {
        if (picture != 23){
            picture += 1;
        }else{
           picture = 0;
        }
        setBackground(picture);
    }
});

function showTime(){
    //split date on variables
    let date = new Date(),
        hour = date.getHours(),
        min  = date.getMinutes(),
        sec  = date.getSeconds(),
        dayW = date.getDay(),
        day  = date.getDate(),
        month= date.getMonth();

    if ((min == 0) && (sec == 0)){
        setBackground(hour);
    }

    switch (dayW) {
        case 0:
            dayW = 'Sunday';
        break;
        case 1:
            dayW = 'Monday';
        break;
        case 2:
            dayW = 'Tuesday';
        break;
        case 3:
            dayW = 'Wednes­day';
        break;
        case 4:
            dayW = 'Thursday';
        break;
        case 5:
            dayW = 'Friday';
        break;
        case 6:
            dayW = 'Saturday';
        break;
    }

    switch (month) {
        case 0:
            month = 'January';
        break;
        case 1:
            month = 'February';
        break;
        case 2:
            month = 'March';
        break;
        case 3:
            month = 'April';
        break;
        case 4:
            month = 'May';
        break;
        case 5:
            month = 'June';
        break;
        case 6:
            month = 'July';
        break;
        case 7:
            month = 'August';
        break;
        case 8:
            month = 'September';
        break;
        case 9:
            month = 'October';
        break;
        case 10:
            month = 'November';
        break;
        case 11:
            month = 'December';
        break;
    }

    //output
    time.innerHTML  = `${hour}<span>:</span>${getZ(min)}<span>:</span>${getZ(sec)}`;
    hDate.innerHTML = `${dayW}<span>, </span>${day}<span> </span>${month}<span>.</span>`;
    
    setTimeout(showTime, 1000);
}  

function showGreeting(){
    let date = new Date(),
        hour = date.getHours();

    if (hour < 6){
        hour = 'Night';
    }else if (hour < 12){
        hour = 'Morning';
    }else if (hour < 18){
        hour = 'Day';
    }else if (hour < 24){
        hour = 'Evening';
    }

    greeting.innerHTML = `<span>Good </span>${hour}<span>, </span>`;
}

function getName(){
    if (localStorage.getItem('name') === null){
        nameS.textContent = '[Enter Name]';
    }else{
        nameS.textContent = localStorage.getItem('name');
    }
}

function setName(param){
    if (param.type === 'keypress'){
        if (param.which == 13 || param.keyCode == 13) {
            if ((nameS.textContent == '') || (param.target.innerText == '[Enter Focus]')){
                getName();
                nameS.blur();
            }else{
                localStorage.setItem('name', param.target.innerText);
                nameS.blur();
            }
          }
    }else if (param.type === 'focus'){
        param.target.innerText = '';
    }else{
        getName();
    }
}

function getFocus(){
    if (localStorage.getItem('focus') === null){
        focusS.textContent = '[Enter Focus]';
    }else{
        focusS.textContent = localStorage.getItem('focus');
    }
}
function setFocus(param){
    if (param.type === 'keypress'){
        if (param.which == 13 || param.keyCode == 13) {
            if ((focusS.textContent == '') || (param.target.innerText == '[Enter Focus]')){
                getFocus();
                alert();
            }else{
                localStorage.setItem('focus', param.target.innerText);
                focusS.blur();
            }
        }
    }else if (param.type === 'focus'){
        param.target.innerText = '';
    }else{
        getFocus();
    } 
}

nameS.addEventListener('keypress', setName);
nameS.addEventListener('blur', setName);
nameS.addEventListener('focus', setName);

focusS.addEventListener('keypress', setFocus);
focusS.addEventListener('blur', setFocus);
focusS.addEventListener('focus', setFocus);

document.addEventListener('DOMContentLoaded', setWeather);
city.addEventListener('keypress', setCity);

//entry point
showTime();
setQuote();
getCity();
setWeather();
showGreeting();
getName();
getFocus();
setBackground();