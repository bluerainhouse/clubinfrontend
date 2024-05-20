<template>
  <br />
  <div class="container">
    <highcharts-chart :options="chartOptions" />
    <br /><br /><br />
    <highcharts-chart :options="chartTwo" />
  </div>
</template>

<style>
.container {
  width: 700px;
  height: 500px;
  margin: 0 auto;
}
</style>

<script>
import HighchartsChart from "@/components/HighchartsChart.vue";

export default {
  name: "GraphExample",
  components: {
    HighchartsChart,
  },
  data() {
    return {
      chartOptions: {
        title: {
          text: "心律雜訊監測折線與柱狀圖",
        },
        subtitle: {
          text: "來源: 量測儀器",
        },
        xAxis: {
          categories: [
            "2021/7/9 12:00AM",
            "2021/7/10 12:00AM",
            "2021/7/11 12:00AM",
            "2021/7/12 12:00AM",
            "2021/7/13 12:00AM",
          ],
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
            data: [0, 0, 1, 0, 3],
          },
          {
            type: "column",
            name: "主動脈膜雜訊(i2)",
            data: [0, 1, 0, 2, 0],
          },
          {
            type: "column",
            name: "冠狀脈膜雜訊(i3)",
            data: [0, 0, 0, 1, 0],
          },
          {
            type: "spline",
            name: "i1+i2+i3",
            data: [0, 1, 1, 3, 3],
            marker: {
              lineWidth: 2,
              lineColor: "rgb(100,100,100)",
              fillColor: "white",
            },
          },
        ],
      },
      chartTwo: {
        chart: {
          type: "scatter",
          zoomType: "xy",
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
          min: 80,
          max: 150,
        },
        yAxis: {
          title: {
            text: "舒張壓 (mmHg)",
          },
          min: 50,
          max: 100,
        },
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
              pointFormat: "{point.x} mmHg, {point.y} mmHg",
            },
          },
        },
        series: [
          {
            name: "量測結果",
            color: "rgba(223, 83, 83, .5)",
            data: [
              [130, 61],
              [110, 59],
              [108, 60],
              [105, 63],
              [111, 53],
              [107, 59],
              [119, 74],
              [112, 69],
              [113, 66],
            ],
          },
        ],
      },
    };
  },
};
</script>
