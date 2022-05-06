(() => {
  var e = {
      932: () => {
        !(function e() {
          const t = document.getElementById("currentTime"),
            r = new Date();
          let n = r.getHours(),
            a = r.getMinutes();
          if ((a < 10 && (a = `0${a}`), n <= "12")) {
            let e = `<span>${n}:${a}</span> am`;
            t.innerHTML = e;
          } else {
            let e = `<span>${n}:${a}</span> pm`;
            t.innerHTML = e;
          }
          setTimeout(function () {
            e();
          }, 1e3);
        })();
      },
    },
    t = {};
  function r(n) {
    var a = t[n];
    if (void 0 !== a) return a.exports;
    var i = (t[n] = { exports: {} });
    return e[n](i, i.exports, r), i.exports;
  }
  (() => {
    "use strict";
    class e {
      constructor(e, t) {
        (this.graph_temp = e), (this.graph_date = t);
      }
      draw() {
        const e = this.graph_temp,
          t = this.graph_date;
        console.log(e), console.log(t);
        const r = {
          type: "bar",
          data: {
            labels: t,
            datasets: [
              {
                label: "Weekly temperature graph",
                backgroundColor: ["blue", "green", "red", "yellow", "purple"],
                hoverBorderWidth: "3px",
                hoverBorderColor: "black",
                data: e,
              },
            ],
          },
          options: {},
        };
        new Chart(document.getElementById("myChart"), r);
      }
    }
    r(932);
    let t = document.getElementById("weather"),
      n = document.getElementById("cityName");
    const a = [],
      i = [];
    document.getElementById("submit").addEventListener("click", function () {
      ({
        getCity: document.getElementById("city").value,
        days_record: [],
        fetchData: function () {
          fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
              this.getCity +
              "&units=metric&appid=808e0c9b54f6aacec3566d6e9ff35b3d"
          )
            .then((e) => e.json())
            .then((e) => {
              "" == this.getCity && alert("pls put city name!");
              let t = e.list;
              this.dayData(t);
              let r = this.getCity;
              n.innerHTML = r;
            });
        },
        separateDailyRecord: function (e, t, r) {
          e.forEach((e) => {
            const n = new Date(e.dt_txt).getDate();
            if (t.getDate() === n) r.push(e);
            else {
              this.getAverage(r), this.days_record.push(r), (r = []);
              let a = t.setDate(t.getDate() + 1);
              (t = new Date(a)).getDate() === n && r.push(e);
            }
          });
        },
        getAverage: function (e) {
          if (e.length) {
            const t = e.reduce(function (e, t) {
              return e + t.main.temp;
            }, 0);
            e.averTemp = (t / e.length).toFixed(1) + "°C";
          }
        },
        getStrDate: function (e) {
          if (this.days_record[0].length) {
            let t = this.days_record[e][0].dt_txt;
            return t.slice(0, t.length - 9);
          }
        },
        getWeather: function (e) {
          if (this.days_record[0].length)
            return this.days_record[e][0].weather[0].main;
        },
        getWeatherDescription: function (e) {
          if (this.days_record[0].length)
            return this.days_record[e][0].weather[0].description;
        },
        renderAverage: function (e) {
          if (this.days_record[0].length) return this.days_record[e].averTemp;
        },
        dayData: function (r) {
          let n = new Date();
          this.separateDailyRecord(r, n, []);
          for (let e = 0; e < this.days_record.length; e++) {
            let r = this.days_record[e][0].weather[0].icon,
              n = document.createElement("DIV");
            n.className = "container";
            let s = document.createElement("p"),
              o = document.createElement("p"),
              d = document.createElement("p"),
              c = document.createElement("p"),
              h = document.createElement("img");
            (s.innerHTML = this.getStrDate(e)),
              a.push(this.getStrDate(e)),
              (o.innerHTML = this.getWeather(e)),
              (d.innerHTML = this.renderAverage(e)),
              i.push(parseFloat(this.renderAverage(e).substring(-1, 1))),
              (c.innerHTML = this.getWeatherDescription(e)),
              (h.src = `http://openweathermap.org/img/wn/${r}@2x.png`),
              n.appendChild(d),
              n.appendChild(o),
              n.appendChild(c),
              n.appendChild(s),
              n.appendChild(h),
              t.appendChild(n);
            let l = t.children[0];
            (l.id = "today"),
              l.setAttribute("style", " color:orange; transform: scale(1.1);"),
              l.children[0].setAttribute(
                "style",
                "font-size: 40px; font-style: italic; color:orangered; margin-top:-15%;line-height: 60px;"
              );
          }
          new e(i, a).draw();
        },
      }.fetchData());
    });
  })();
})();
