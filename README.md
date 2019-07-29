# RealtimeWeatherApp
Preview the site at https://ttcode10.github.io/

![image](https://github.com/ttcode10/ttcode10.github.io/blob/master/readme-img/day-mode.png)
<br>1. <strong>Realtime Request: </strong>Lookup realtime weather and 5 day forecast of world cities, powered by metaweather.com API.


![image](https://github.com/ttcode10/ttcode10.github.io/blob/master/readme-img/search-results.png)<br>
2. <strong>Input Debounce Protection: </strong>To prevent unnecessary frequent querying the API, at least two characters are required while input destination and start executing data fetching after 300ms pause of input.<br><br>
3. <strong>Asynchronous Query: </strong>Implemented asynchronous method to get backend data, significantly reducing user waiting.


![image](https://github.com/ttcode10/ttcode10.github.io/blob/master/readme-img/night-mode.png)<br>
4. <strong>Night Mode: </strong>Change background to dark color if the destination is at night, calculated according to the sunrise and sunset time.


![image](https://github.com/ttcode10/ttcode10.github.io/blob/master/readme-img/responsive.png)<br>
5. <strong>Responsive Layout: </strong>Automatically render the proper layout to fit the screen size.


![image](https://github.com/ttcode10/ttcode10.github.io/blob/master/readme-img/init.png)<br>
![image](https://github.com/ttcode10/ttcode10.github.io/blob/master/readme-img/no-results.png)<br>
6. <strong>Initial & Error State: </strong>Display world map as initial state and redirect to error state indicating no search results.
