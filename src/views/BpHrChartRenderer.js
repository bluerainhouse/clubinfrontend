import Highcharts from "highcharts";

export function BpHrChart(chartData) {
  const chartOptions = {
    title: {
      text: "血壓與脈搏監測",
    },
    subtitle: {
      text: "來源: 量測儀器",
    },
    xAxis: {
      categories: chartData.categories,
    },
    yAxis: [
      {
        title: {
          text: "血壓 (mmHg)",
        },
      },
      {
        title: {
          text: "脈搏 (bpm)",
        },
        opposite: true,
      },
    ],
    series: [
      {
        type: "column",
        name: "脈搏",
        data: chartData.hr,
        marker: {
          lineColor: "rgb(100,100,100)",
        },
      },
      {
        type: "spline",
        name: "收縮壓",
        data: chartData.highBp,
        marker: {
          lineWidth: 2,
          lineColor: "rgb(100,100,100)",
          fillColor: "white",
        },
      },
      {
        type: "spline",
        name: "舒張壓",
        data: chartData.lowBp,
        marker: {
          lineWidth: 2,
          lineColor: "rgb(100,100,100)",
          fillColor: "white",
        },
      },
    ],
  };

  return new Highcharts.Chart("bphrgraph", chartOptions);
}
