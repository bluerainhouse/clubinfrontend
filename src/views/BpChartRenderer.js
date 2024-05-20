import Highcharts from "highcharts";

export function BpChart(chartData) {
  console.log(chartData);
  const chartOptions = {
    chart: {
      type: "scatter",
      plotBackgroundColor: {
        linearGradient: { x1: 0, y1: 0.5, x2: 0.5, y2: 0 },
        stops: [
          [0, "rgba(0, 255, 0,0.5)"],
          [0.2, "rgba(255, 255, 0,0.5)"],
          [1, "rgba(255, 0, 0,0.5)"],
        ],
      },
    },
    title: {
      text: "血壓分布圖",
    },
    subtitle: {
      text: "來源: 量測儀器",
    },
    xAxis: {
      title: {
        enabled: true,
        text: "收縮壓 (mmHg)",
      },
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true,
      min: 90,
      max: 180,
      tickInterval: 10,
    },
    yAxis: {
      title: {
        text: "舒張壓 (mmHg)",
      },
      min: 50,
      max: 110,
      tickInterval: 10,
    },
    series: [
      {
        name: "血壓紀錄",
        data: chartData.map((point) => ({
          x: point.x,
          y: point.y,
          name: point.name,
        })),
        marker: {
          symbol: "circle",
        },
      },
    ],
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              lineColor: "rgb(100,100,100)",
            },
          },
        },
        states: {
          hover: {
            marker: {
              enabled: false,
            },
          },
        },
        tooltip: {
          pointFormat: "{point.name}: {point.x} mmHg, {point.y} mmHg",
        },
      },
    },
  };

  return new Highcharts.Chart("bpgraph", chartOptions);
}
