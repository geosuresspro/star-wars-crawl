import { Config } from "../config.js";
import { Graph } from "./graph.js";
import { currentTime } from "./time.js";

const key = Config.key;
let renderWeather = document.getElementById("weather");
let cityName = document.getElementById("cityName");

const graph_date = [];
const graph_temp = [];

export const getWeatherData = function () {
  let Weather = {
    getCity: document.getElementById("city").value,
    days_record: [],

    // fetch data
    fetchData: function fetchData() {
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          this.getCity +
          "&units=metric" +
          "&appid=" +
          key
      )
        .then((response) => response.json())
        .then((data) => {
          if (this.getCity == "") {
            alert("pls put city name!");
          }
          let listData = data.list;
          this.dayData(listData);

          let valueCity = this.getCity;
          // valueCity.toUpperCase();
          cityName.innerHTML = valueCity;
        });
    },

    //  separate each of the days
    separateDailyRecord: function separateDailyRecord(
      listData,
      firstDay,
      day_record
    ) {
      listData.forEach((rowData) => {
        const recordDate = new Date(rowData.dt_txt).getDate();

        if (firstDay.getDate() === recordDate) {
          day_record.push(rowData);
        } else {
          this.getAverage(day_record);
          this.days_record.push(day_record);
          day_record = [];

          let dt_next = firstDay.setDate(firstDay.getDate() + 1);
          firstDay = new Date(dt_next);

          if (firstDay.getDate() === recordDate) {
            day_record.push(rowData);
          }
        }
      });
    },

    // get average temp
    getAverage: function getAverage(rowData) {
      if (rowData.length) {
        const tempTotal = rowData.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue.main.temp;
        }, 0);
        rowData.averTemp = (tempTotal / rowData.length).toFixed(1) + "°C";
      }
    },
    // render Time
    getStrDate: function getStrDate(i) {
      if (this.days_record[0].length) {
        let strDate = this.days_record[i][0].dt_txt;
        return strDate.slice(0, strDate.length - 9);
      }
    },

    // render weather description
    getWeather: function getWeather(i) {
      if (this.days_record[0].length) {
        let weatherMain = this.days_record[i][0].weather[0].main;
        return weatherMain;
      }
    },
    // render weather description
    getWeatherDescription: function getWeatherDescription(i) {
      if (this.days_record[0].length) {
        let weatherDescription = this.days_record[i][0].weather[0].description;
        return weatherDescription;
      }
    },

    // render average
    renderAverage: function renderAverage(i) {
      if (this.days_record[0].length) {
        let average = this.days_record[i].averTemp;
        return average;
      }
    },

    dayData: function dayData(listData) {
      let firstDay = new Date();
      let day_record = [];
      this.separateDailyRecord(listData, firstDay, day_record);

      for (let i = 0; i < this.days_record.length; i++) {
        let icon = this.days_record[i][0].weather[0].icon;
        let container = document.createElement("DIV");
        container.className = "container";

        let p_date = document.createElement("p");
        let p_weather = document.createElement("p");
        let p_average = document.createElement("p");
        let p_Description = document.createElement("p");
        let image = document.createElement("img");

        p_date.innerHTML = this.getStrDate(i);
        graph_date.push(this.getStrDate(i));
        p_weather.innerHTML = this.getWeather(i);
        p_average.innerHTML = this.renderAverage(i);
        graph_temp.push(parseFloat(this.renderAverage(i).substring(-1, 1)));
        p_Description.innerHTML = this.getWeatherDescription(i);
        image.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        container.appendChild(p_average);
        container.appendChild(p_weather);
        container.appendChild(p_Description);
        container.appendChild(p_date);
        container.appendChild(image);

        renderWeather.appendChild(container);

        let firstChild = renderWeather.children[0];
        firstChild.id = "today";
        firstChild.setAttribute(
          "style",
          " color:orange; transform: scale(1.1);"
        );

        let firstChildOfChild = firstChild.children[0];
        firstChildOfChild.setAttribute(
          "style",
          "font-size: 40px; font-style: italic; color:orangered; margin-top:-15%;line-height: 60px;"
        );
      }
      let graph = new Graph(graph_temp, graph_date);
      graph.draw();
      //currentTime()
    },
  };
  Weather.fetchData();
};
