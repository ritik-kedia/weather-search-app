const cityInput = document.querySelector("#city-input");
const inputbtn = document.querySelector("#input-btn");
const resultBox = document.querySelector("#result-box");

inputbtn.addEventListener(
    "click",
    async () => {
        const cityName = cityInput.value;

        if (cityName != "") {
            resultBox.innerHTML =
                `<div>
                    <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                    </div>
            </div>`
            cityInput.value = ""
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=21805bff7224936fa25d6cec016a0a4b&units=metric`);
            const data = await response.json();
            console.log(data);

            if (data.cod == "404") {
                resultBox.innerHTML =
                `<h4>City not Found!</h4>`;
                cityInput.value=cityName;

            } else if (data.cod == "200") {
                
                resultBox.innerHTML = ` <div class="card-body">
                <h5 class="fw-bold">${cityName}</h5>
                <p>Temperature : ${data.main.temp} ℃</p>
                <p>sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
                <div class="d-flex justify-content-center align-items-center fw-bold">
                <h4 class="fw-bold">${data.weather[0].main}</h4>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" width="100">
                </div>
                </div>`
            } else {
                resultBox.innerHTML =
                `<h4>Internal server error!</h4>`;
               

            }


        } else {
            cityInput.focus();
        }

    }
)