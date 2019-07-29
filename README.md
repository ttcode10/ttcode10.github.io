# RealtimeWeatherApp
Preview the site at https://ttcode10.github.io/

![image](http://github.com/ttcode10/ttcode10.github.io/readme-img/day-mode.png)
**Realtime Request: **Lookup weather including 5 days forecasts of world cities, powered by metaweather.com API.

![image](http://github.com/ttcode10/ttcode10.github.io/readme-img/search-results.png)
2. **Input Debounce Protection: **To prevent unnecessary frequent query to the API, at least two characters are required while input destination and start executing data fetching after 300ms pause of input.

3. **Asynchronous Query: **Implement asynchronous function to get backend data, significantly reducing user waiting.

![image](http://github.com/ttcode10/ttcode10.github.io/readme-img/night-mode.png)
4. **Night Mode: **Change background to dark color if the destination is at night, calculated according to the sunrise and sunset time.

![image](http://github.com/ttcode10/ttcode10.github.io/readme-img/responsive.png)
5. **Responsive Layout: **Automatically render the proper layout according to the screen size.

![image](http://github.com/ttcode10/ttcode10.github.io/readme-img/init.png)
![image](http://github.com/ttcode10/ttcode10.github.io/readme-img/no-results.png)
6. **Initial & Error State: **Display world map as initial state and redirect to error state indicating no search results.
