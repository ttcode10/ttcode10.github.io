// Set world map as init background
const init = () => {
    const beforeSearchHTML = `
        <div class = "searchDefault">
            <img src="../image/map.svg" alt="map">
            <h3>Look up world weather...</h3>
        </div>
        `;
    document.querySelector('.search-result').innerHTML = beforeSearchHTML;
    document.querySelector('.search input').focus();
    document.querySelector('.background').classList.remove('night');
};
init();

// Setup event listener and get input text
const search = document.querySelector('.search input');

search.addEventListener('keyup', e => {
    debounce(queryCities, null, 300, search.value, 400);
});

const debounce = (fn, context, delay, text, mustApplyTime) => {
    clearTimeout(fn.timer);
    fn._cur = Date.now();

    if(!fn._start){
        fn._start = fn._cur;
    }
    if(fn._cur - fn._start > mustApplyTime){
        fn.call(context, text);
        fn._start = fn._cur;
    }else{
        fn.timer = setTimeout(function(){
            fn.call(context, text);
        }, delay);
    }
}

// Fetch api result
const queryCities = async (inputText) => {
    // Query api with input keywords
    const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${inputText}`);
    const dataQuery = await result.json();

    // Filter result with current text input
    let matches = dataQuery.filter(city => {
        const regex = new RegExp(`^${inputText}`, 'gi');
        return city.title.match(regex);
    });

    // Show world map background if clear input text
    if (inputText.length >= 2) {
        outputSearchHTML(matches);
        document.querySelector('.search input').focus();
    } else {
        document.querySelector('.grid-container-up').innerHTML = '';
        document.querySelector('.grid-container-down').innerHTML = '';
        matches = [];
        init();
    }
};

// Show results list after search
const outputSearchHTML = (matches) => {
    if (matches.length > 0) {
        const html = matches.map(match => `
            <div class = "city-list" id = "${match.woeid}">
                <h2>${match.title}</h2>
                <h3>Latitude: ${match.latt_long.split(',')[0]}</h3>
                <h3>Longitude: ${match.latt_long.split(',')[1]}</h3>
            </div>
        `).join('');
        document.querySelector('.search-result').innerHTML = html;
        document.querySelector('.grid-container-up').innerHTML = '';
        document.querySelector('.grid-container-down').innerHTML = '';
        document.querySelector('.background').classList.remove('night');
    } else {
        document.querySelector('.search-result').innerHTML = `
            <div class="no-results-list">
                <i class="fa fa-search no-results"></i>
                <p>No results</p>
            </div>
        `;
    }
};


// Get weather by clicked woeid
document.querySelector('.search-result').addEventListener('click', async e => {

    const getWeather = async (id) => {
        const url = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`;
        const targetCity = await fetch(url);
        const dataCity = await targetCity.json();
        return dataCity;
    };

    const renderWeather = function (data) {

        const changeBackground = () => {
            if ((Date.parse(data.time) > Date.parse(data.sun_set)) || (Date.parse(data.time) < Date.parse(data.sun_rise))) {
                document.querySelector('.background').classList.add('night');
            }
        };
        changeBackground();

        const today = data.consolidated_weather[0];
        const formatDate = (data.time).split('T')[0];
        const formatTime = (data.time).split('T')[1].slice(0, 5);
        const formatSunRise = (data.sun_rise).split('T')[1].slice(0, 5);
        const formatSunSet = (data.sun_set).split('T')[1].slice(0, 5);

        const todayMarkup = `
            <div class="city">
                <div class="location"><h1>${data.title}</h1></div>
                <div class="time"><h3>${formatDate} ${formatTime}</h3></div>
            </div>

            <div class="current-temperature">
                <div class="now-temperature"><h1>${Math.round(today.the_temp)}°C</h1></div>
                <div class="range"><h3>${today.weather_state_name}</h3></div>
            </div>

            <div class="detail">
                <ul>
                    <li>Wind Speed: ${today.wind_speed.toFixed(0)} mph</li>
                    <li>Humidity: ${Math.round(today.humidity)}%</li>
                    <li>Visibility: ${Math.round(today.visibility*1.6)} km</li>
                    <li>Predictability: ${today.predictability}%</li>
                    <li>Sunrise: ${formatSunRise}   Sunset: ${formatSunSet}</li>
                </ul>
            </div>
            <div class="today-icon weather-icon">
                <img src="https://www.metaweather.com/static/img/weather/${today.weather_state_abbr}.svg" alt="${today.weather_state_name}">
            </div>
        `;

        const domToday = document.querySelector('.grid-container-up');
        domToday.insertAdjacentHTML('afterbegin', todayMarkup);

        for (let i = 1; i < 6; i++) {
            const forecast = data.consolidated_weather[i];
            const forecastMarkup = `
                    <div id="forecast-${i}" class="forecast-item">
                        <div class="date">
                            <h2>${forecast.applicable_date}</h2>
                        </div>
                        <div class="forecast-icon weather-icon">
                            <img src="https://www.metaweather.com/static/img/weather/${forecast.weather_state_abbr}.svg" alt="${forecast.weather_state_name}">
                        </div>
                        <div class="range">
                            <h3>${Math.round(forecast.min_temp)}°C ~ ${Math.round(forecast.max_temp)}°C</h3>
                        </div>
                    </div>
            `;
            const domForecast = document.querySelector('.grid-container-down');
            domForecast.insertAdjacentHTML('beforeend', forecastMarkup);
        };

    };

    const cityID = e.target.closest('.city-list').id;
    const weather = await getWeather(cityID);
    if (weather) {
        document.querySelector('.search-result').innerHTML = '';
        document.querySelector('.search input').value = '';
        renderWeather(weather);
    }

});