let search = document.getElementById("search");
let btn = document.getElementById("btn");
const API_KEY = "702e74e195add3cd3b83bdcea3528621";
let box = document.querySelector(".box");
let name_box = document.querySelector(".name_box");
let temp_text = document.querySelector(".temp_text");
let cloud_img = document.querySelector(".cloud_img");

function checkEnterKey(event) {
    if (event.key === "Enter") {
        fetchData();
    }
}


function fetchData() {
  if (search.value.trim() === "") {
    alert("Input Is Empty");
  } else {
    box.innerHTML = `<h1>Loading.....</h1>`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${API_KEY}`;

    fetch(url)
      .then((res) => {
        box.innerHTML = "";
        return res.json();
      })
      .then((data) => {
        showData(data);
      })

      .catch((err) => {
        console.log(err);
      });
  }
}

function showData(data) {
  const { country } = data.sys;
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  const { all } = data.clouds;
  let updatedTemp = Math.floor(temp);
  let todayDate = new Date();
  let newDate = todayDate.toDateString();
  let { main, icon, id } = data.weather[0];

  let urlImg;
  if (id >= 200 && id <= 232) {
    urlImg = "images/scattered-thunderstorms.png";
  } else if (id >= 300 && id <= 321) {
    urlImg = "images/rain.png";
  } else if (id >= 500 && id <= 531) {
    urlImg = "images/rain (1).png";
  } else if (id >= 600 && id <= 622) {
    urlImg = "images/snow.png";
  } else if (id >= 701 && id <= 781) {
    urlImg = "images/clouds.png";
  } else if (id >= 801 && id <= 804) {
    urlImg = "images/clouds.png";
  } else {
    
      urlImg = "images/clear-sky.png";
    
  }

  name_box.innerHTML = `
    <h1>${data.name},</h1>
  <h2>${country}</h2>
  <h4>${newDate}</h4>
    `;

  cloud_img.innerHTML = `
  <img src="${urlImg}"/>
  
    `;

  temp_text.innerHTML = `
     <h1>${updatedTemp} °C</h1>
     <h2>${main}</h2>
    `;
  box.innerHTML = `
            <h1 class='humidity'>  <img class="imgSet" src="./images/humidity.png"> <span class='span'>Humidity</span> <p class='paragraph'> ${humidity} </p></h1>
            <h1 class='humidity'>  <img class="imgSet" src="./images/wind.png"> <span class='span'>Wind</span><p class='paragraph'>  ${speed}Km/h </p></h1>
            <h1 class='humidity'>  <img class="imgSet" src="./images/clouds_icons.png"> <span class='span'>Clouds</span><p class='paragraph'>  ${all}% </p></h1>

    `;
  search.value = "";

  console.log(data);
}

btn.addEventListener("click", fetchData);
