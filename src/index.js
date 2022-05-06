import { getWeatherData } from "./weather.js";

const submit = document.getElementById("submit");
submit.addEventListener("click", getWeatherData);
