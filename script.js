window.addEventListener("load", () => {
  const day = document.querySelector(".day");
  const loc = document.querySelector(".loc");
  const slider = document.querySelector(".slider");
  const switchButton = document.querySelector(".switch-button");
  const degreeIcon = document.querySelector(".description img");
  const temp = document.querySelector(".degree .temp");
  const label = document.querySelector(".degree .label");
  const degree = document.querySelector(".degree");
  const body = document.querySelectorAll("body");

  // check if user location is active
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

    // Toggle betweeen light and dark mode
    let moon = true;
    switchButton.addEventListener("click", () => {
      if (!moon) {
        slider.classList.toggle("slider-left");
        moon = false;
      } else {
        slider.classList.toggle("slider-right");
        body.forEach(body => {
          body.classList.toggle('light')
        })
        degree.classList.toggle('light')
        moon = true;
      }
    });

    // Get user current location
    var lat, long, apiKey, metric;
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lat = position.coords.latitude;
      long = position.coords.longitude;
      metric = 'metric';
      apiKey = 'c2f18040d6f9d805ddb525840e080a2a';

      // API call
      // const url = "https://api.openweathermap.org/data/2.5/weather?q=abuja&appid=c2f18040d6f9d805ddb525840e080a2a&units=metric";

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${metric}`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {

          dom(data);

          console.log(data);
        })
        .catch((err) => console.log(err));
    });

    // DOM elements function
    const dom = (data) => {
      // get date, month and full year
      const fullDate = `${date.getDate()}, ${getMonth(
        months
      )} ${date.getFullYear()}`;
      day.textContent = fullDate;

      // location city and country
      loc.innerHTML = `<i class="fa-solid fa-location-pin"></i> <span class="city">${data.name}</span>, ${data.sys. country}`;

      // weather icon url
      const iconUrl = `https://api.openweathermap.org/img/w/${data.weather[0].icon}`;
      degreeIcon.src = iconUrl;

      // getting temperature degree in celsius
      const tempDegree = Math.round(data.main.temp);
      temp.innerHTML = `${tempDegree}<span class='sign-deg'>°</span><span class='sign'>c</span>`;

      // convert celsius to fahrenheit
      let fahrenheit = Math.round((tempDegree * 1.8) + 32)
      
      // toggle between fahrenheit and celsius
      var count = 0;
      temp.addEventListener('click', () => {
        count++;

        if (count % 2 === 0) {
          temp.innerHTML = `${tempDegree}<span class='sign-deg'>°</span><span class='sign'>c</span>`;
        } else {
          temp.innerHTML = `${fahrenheit}<span class='sign-deg'>°</span><span class='sign'>F</span>`;
        }

        console.log(count)
      })
      // weather description
      label.textContent = data.weather[0].description;
    };
  } else {
    console.log("Geolocation is not supported");
  }
});
