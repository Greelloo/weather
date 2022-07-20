window.addEventListener("load", () => {
  const day = document.querySelector(".day");
  const loc = document.querySelector(".loc");
  const slider = document.querySelector(".slider");
  const sliderSun = document.querySelector(".slider-sun");
  const sliderMoon = document.querySelector(".slider-moon");
  const switchButton = document.querySelector(".switch-button");
  const degreeIcon = document.querySelector(".degree img");
  const temp = document.querySelector(".degree .temp");
  const label = document.querySelector(".degree .label");

  if (navigator.geolocation) {

    // Setting up the date
    const date = new Date();

    // Array of Months
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dev",
    ];

    // get month in text function
    const getMonth = (months) => {
      let currentMonth = "";
      const monthIndex = date.getMonth();

      // Iterate thtrough the array of months
      months.forEach((month, index) => {
        if (monthIndex === index) {
          currentMonth = month;
        }
      });

      // Return current month
      return currentMonth;
    };

    // DOM elements function
    const dom = () => {
      // get date, month and full year
      const fullDate = `${date.getDate()}, ${getMonth(
        months
      )} ${date.getFullYear()}`;
      day.textContent = fullDate;
    };

    // switch between moon and sun(dark and light mode)
    let moon = true;
    switchButton.addEventListener("click", () => {
      if (!moon) {
        slider.classList.toggle("slider-left");
        moon = false;
      } else {
        slider.classList.toggle("slider-right");
        moon = true;
      }
    });
    dom();

    // Get user current location
    let lat, long, apiKey, metric;
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      lat = position.coords.latitude
      long = position.coords.longitude
      metric = 'metric'
      apiKey = 'c2f18040d6f9d805ddb525840e080a2a'

      // API call
    let apiData = {};
    // const url =
    //   "https://api.openweathermap.org/data/2.5/weather?q=abuja&appid=c2f18040d6f9d805ddb525840e080a2a&units=metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${metric}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        loc.innerHTML = `<i class="fa-solid fa-location-pin"></i> <span class="city">${data.name}</span>, ${data.sys.country}`;

        const iconUrl = `https://api.openweathermap.org/img/w/${data.weather[0].icon}`;
        degreeIcon.src = iconUrl;

        const tempDegree = Math.round(data.main.temp);
        temp.innerHTML = `${tempDegree}<span class='sign-deg'>°</span><span class='sign'>c</span>`;

        label.textContent = data.weather[0].description;

        console.log(data);
      })
      .catch((err) => console.log(err));
    });
  } else {
    console.log("Geolocation is not supported");
  }
});
