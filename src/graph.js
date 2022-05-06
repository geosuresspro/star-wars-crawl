class Graph {
  constructor(graph_temp, graph_date) {
    this.graph_temp = graph_temp;
    this.graph_date = graph_date;
  }

  draw() {
    const labels = this.graph_temp;
    const dataDt = this.graph_date;

    console.log(labels);
    console.log(dataDt);

    const data = {
      labels: dataDt,
      datasets: [
        {
          label: "Weekly temperature graph",
          backgroundColor: ["blue", "green", "red", "yellow", "purple"],
          hoverBorderWidth: "3px",
          hoverBorderColor: "black",
          data: labels,
        },
      ],
    };

    const config = {
      type: "bar",
      data: data,
      options: {},
    };

    const myChart = new Chart(document.getElementById("myChart"), config);
  }
}

export { Graph };
