<template>
  <div ref="chartContainer"></div>
</template>

<script>
import Highcharts from "highcharts";

export default {
  name: "HighchartsChart",
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.chart = new Highcharts.Chart(
        this.$refs.chartContainer,
        this.options
      );
    });
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>
