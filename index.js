const city = document.getElementById("city");
const content = document.getElementById("content");
const dailyShow = document.getElementById("dailyShow");

const showCity = (fla, cityName, lat, lon, temp, tempMin, tempMax, wind, clo) =>
  `
    <div class="bg-white border-round p-3 mb-3">
        <div class="flex gap-3 pb-2">
            <img src="https://openweathermap.org/images/flags/${fla}.png" alt="">
            <p class="font">${cityName} City</p>
        </div>
    <span class="bg-gray-900 text-0 border-round-xl px-2">${temp}°C</span> temperature form ${tempMin} to ${tempMax}°C
    wind ${wind} m/s. Clouds ${clo}% <br>
    Geo coords [${lat}, ${lon}]
`;

const handleClick = (event) => {
  if (event.keyCode == 13) {
    const key = event.target.value;
    const api = `https://openweathermap.org/data/2.5/find?q=${key}&appid=439d4b804bc8187953eb36d2a8c26a02`;
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        const fla = data.list[0].sys.country.toLowerCase();
        const cityName = data.list[0].name;
        const lat = data.list[0].coord.lat;
        const lon = data.list[0].coord.lon;
        const temp = (data.list[0].main.temp - 273.15).toFixed(2); //tofixed(2) hàm làm tròn
        const tempMin = (data.list[0].main.temp_min - 273.15).toFixed(2);
        const tempMax = (data.list[0].main.temp_max - 273.15).toFixed(2);
        const wind = data.list[0].wind.speed;
        const clo = data.list[0].clouds.all;

        handleSeach(lat, lon, cityName);

        city.innerHTML = "";
        // chỗ này xài map để lấy dữ liệu ra nhưng mà chọc vào data không đúng nên ra undefined nên phải viết lại
        // n là 1 object trong data.list nên chọc vào n.fla, n.cityName, n.lat, n.lon, n.temp, n.tempMin, n.tempMax, n.wind, n.clo là sai
        // phải làm như những thằng ở trên mới đúng ví dụ n.sys.country.toLowerCase()
        data.list.map((n) => {
          city.innerHTML += showCity(
            n.sys.country.toLowerCase(),
            n.name,
            n.lat,
            n.lon,
            n.temp,
            n.tempMin,
            n.tempMax,
            n.wind,
            n.clo
          );
        });
      });
  }
};

const handleSeach = (lat, lon, cityName) => {
  const api = `https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=439d4b804bc8187953eb36d2a8c26a02`;
  fetch(api)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const dt = data.current.dt;
      let time = new Date(dt * 1000);
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      let getDay = time.toLocaleDateString("en-US", { weekday: "short" });
      let getTime = time.toLocaleDateString("en-US", options);
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let phaseTime = time
        .toLocaleString("en-US", { hour: "numeric", hour12: true })
        .slice(-2);
      let date = time.toLocaleDateString("en-US", { weekday: "short" });
      let temp = (data.current.temp - 273.15).toFixed(2);
      let a = data.daily;
      console.log(a);
      //   let icon = data.daily.weather.icon;
      // không lấy được icon vì icon nằm trong mảng daily nên phải lấy ra từng phần tử trong mảng code này
      content.innerHTML = "";
      //   bỏ icon
      content.innerHTML += wertherShow(
        getTime,
        cityName,
        hours,
        minutes,
        phaseTime,
        a
      );
    });
};

// bỏ icon
const wertherShow = (getTime, cityName, hours, minutes, phaseTime, a) => `
<div>
    <h1 class="text-red-300">${hours}:${minutes} ${phaseTime}</h1>
    <h3 class="font-light">${getTime}</h3>
</div>

<h1 class="pt-3 pb-5 text-red-300">Welcome to ${cityName} City</h1>
<!--xài map ở đây xài foreach thì lỗi   -->
${a
  .map((n) => {
    `
        <div class="w-1 bg-red-300 shadow-8 md:shadow-4 border-round">
            <img class="w-full" src="https://openweathermap.org/img/wn/${n.weather[0].icon}@2x.png" alt="">
            <div class="text-center py-3 text-0">
                <h2>Sun</h2>
                <p>28°C</p>
            </div>
</div>
        `;
  })
  .join("")}


<div class="border-top-2 border-red-300 my-6"></div>

<div class="font">
<h1 class="text-red-300 pb-4">Sunday</h1>
<div class="flex gap-5">
    <div class="w-3">
        <p class="text-red-300 pb-2">Sun and Moon</p>
        <p>Sunrise: </p>
        <p>Sunset:</p>
        <p>Moonrise:</p>
        <p>Moonset:</p>
    </div>

    <div class="w-3">
        <p class="text-red-300 pb-2">Temperature</p>
        <p>Day:</p>
        <p>Min:</p>
        <p>Max:</p>
        <p>Night:</p>
    </div>

    <div class="w-3">
        <p class="text-red-300 pb-2">Feels like</p>
        <p>Day:</p>
        <p>Night:</p>
        <p>Evening:</p>
        <p>Morning:</p>
    </div>

    <div class="w-3">
        <p class="text-red-300 pb-2">Other</p>
        <p>Wind degrees:</p>
        <p>Wind speed:</p>
        <p>Cloud:</p>
        <p>UV:</p>
    </div>
</div>

</div>
`;

// const getDay = (show_8Day)=>`
