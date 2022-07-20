window.addEventListener("load", () => {
  const day = document.querySelector(".day");
  const loc = document.querySelector(".loc");
  const slider = document.querySelector('.slider')
  const sliderSun = document.querySelector('.slider-sun')
  const sliderMoon = document.querySelector('.slider-moon')
  const switchButton = document.querySelector('.switch-button')
  const city = document.querySelector('.city')
  const degreeIcon = document.querySelector('.degree img')

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
    const fullDate = `${date.getDate()}, ${getMonth(months)} ${date.getFullYear()}`
    day.textContent = fullDate
  }

  // switch between moon and sun(dark and light mode)
  let moon = true
  switchButton.addEventListener('click', () => {
    if (!moon) {
        slider.classList.toggle('slider-left')
        moon = false
    } else {
        slider.classList.toggle('slider-right')
        moon = true
    }
  })
  dom();


  // API call
  let apiData = {}
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=kano&appid=c2f18040d6f9d805ddb525840e080a2a'
  fetch(url)
    .then(response => response.json())
    .then(data => {
      loc.innerHTML =  `<i class="fa-solid fa-location-pin"></i> <span class="city">${data.name}</span>, ${data.sys.country}`

      iconUrl = `https://api.openweathermap.org/img/w/${data.weather[0].icon}`
      degreeIcon.src = iconUrl;

      console.log(data)
    })
    .catch(err => console.log(err))
});
