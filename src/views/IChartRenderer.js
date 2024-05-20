import Highcharts from "highcharts";

export function IChart(chartData) {
  console.log(chartData);
  const chartOptions = {
    chart: {
      renderTo: "igraph",
    },
    title: {
      text: "心律雜訊監測折線與柱狀圖",
    },
    subtitle: {
      text: "來源: 量測儀器",
    },
    xAxis: {
      categories: chartData.categories,
    },
    yAxis: {
      title: {
        text: "數值",
      },
      plotLines: [
        {
          value: 0,
          width: 1,
          color: "#808080",
        },
      ],
    },
    series: [
      {
        type: "column",
        name: "心律不整雜訊(i1)",
        data: chartData.i1,
      },
      {
        type: "column",
        name: "主動脈膜雜訊(i2)",
        data: chartData.i2,
      },
      {
        type: "column",
        name: "冠狀脈膜雜訊(i3)",
        data: chartData.i3,
      },
      {
        type: "spline",
        name: "i1+i2+i3",
        data: chartData.sum,
        marker: {
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[3],
          fillColor: "white",
        },
      },
    ],
  };

  return new Highcharts.Chart("igraph", chartOptions);
}
