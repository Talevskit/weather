window.addEventListener("load", () => {
  let long;
  let lat;

  let description = document.querySelector(".description");
  let degree = document.querySelector(".temperature-degree");
  let timezone = document.querySelector(".timezone");
  let temp = document.querySelector(".temperature");
  let tempSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/5903a6efa2fcd5154a38722a96c1b7ff/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          //DOM elements
          degree.textContent = temperature;
          description.textContent = summary;
          timezone.textContent = data.timezone;

          let cels = (temperature - 32) * (5 / 9);

          //set icon
          setIcons(icon, document.querySelector(".icon"));

          //change to celsius

          temp.addEventListener("click", () => {
            if (tempSpan.textContent === "F") {
              tempSpan.textContent = "C";
              degree.textContent = Math.floor(cels);
            } else {
              tempSpan.textContent = "F";
              degree.textContent = temperature;
            }
          });
        });
    });
  }
  const setIcons = (icon, iconID) => {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  };
});
