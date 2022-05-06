// get current Time
function currentTime() {
  const currentTiming = document.getElementById("currentTime");
  const date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  if (hour <= "12") {
    let time = `<span>${hour}:${min}</span> am`;
    currentTiming.innerHTML = time;
  } else {
    let time = `<span>${hour}:${min}</span> pm`;
    currentTiming.innerHTML = time;
  }
  let timing = setTimeout(function () {
    currentTime();
  }, 1000);
}
currentTime();
