<template>
  <div class="all">
    <div class="row"></div>
    <div class="row"></div>
    <div class="row"></div>
    <div class="row"></div>
    <div class="row"></div>
    <div class="row"></div>
    <div
      class="col"
      id="bpgraph"
      style="width: 600px; height: 450px; margin: 0 auto"
    ></div>
    <div class="col">
      <h2>關於血壓</h2>
      <div class="row">
        <div class="col" id="small" style="color: blue; font-weight: bold">
          高血壓說明
        </div>
        <div class="col" id="small" style="color: blue; font-weight: bold">
          收縮壓
        </div>
        <div class="col" id="small" style="color: blue; font-weight: bold">
          舒張壓
        </div>
      </div>
      <div class="row">
        <div class="col" id="small">第二期高血壓</div>
        <div class="col" id="small" style="color: red">>160</div>
        <div class="col" id="small" style="color: red">>100</div>
      </div>
      <div class="row">
        <div class="col" id="small">第一期高血壓</div>
        <div class="col" id="small" style="color: rgb(255, 128, 64)">
          140-159
        </div>
        <div class="col" id="small" style="color: rgb(255, 128, 64)">90-99</div>
      </div>
      <div class="row">
        <div class="col" id="small">前期高血壓</div>
        <div class="col" id="small" style="color: rgb(255, 128, 64)">
          120-139
        </div>
        <div class="col" id="small" style="color: rgb(255, 128, 64)">80-89</div>
      </div>
      <div class="row">
        <div class="col" id="small">正常</div>
        <div class="col" id="small" style="color: green">90-119</div>
        <div class="col" id="small" style="color: green">60-79</div>
      </div>
    </div>
    <div class="row"><br /><br /><br /></div>
    <div class="row"><br /><br /><br /></div>
    <div
      id="bphrgraph"
      style="width: 600px; height: 450px; margin: 0 auto"
    ></div>
    <div class="row"></div>
    <div class="row"><br /><br /><br /></div>
    <div class="row"><br /><br /><br /></div>
    <div id="igraph" style="width: 600px; height: 450px; margin: 0 auto"></div>
    <div class="col">
      <div class="row"></div>
      <div class="row"></div>
      <h2>關於i1、i2、i3</h2>
      <div class="row"></div>
      <div class="row"></div>
      <div class="row"></div>
      <div class="row"></div>

      <div class="row">
        <div class="col" id="small">0</div>
        <div class="col" id="small">1~3</div>
        <div class="col" id="small">3以上</div>
      </div>
      <div class="row">
        <div class="col" id="small">健康</div>
        <div class="col" id="small">須注意</div>
        <div class="col" id="small">建議就醫</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.all {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px;
}

.col {
  padding: 10px;
  text-align: center;
}

.safe {
  color: green;
}

.middle {
  color: rgb(255, 128, 64);
}

.danger {
  color: red;
}

#small {
  font-size: 100%;
}

h2 {
  font-weight: bold;
  text-align: center;
}
</style>

<script>
import { BpHrChart } from "./BpHrChartRenderer.js";
import { BpChart } from "./BpChartRenderer.js";
import { IChart } from "./IChartRenderer.js";

import authHeader from "@/services/auth-header";
import axios from "axios";

export default {
  name: "GraphView",
  props: ["user"],
  data() {
    return {
      responseData: [],
      categories: [],
      highBp: [],
      lowBp: [],
      hr: [],
      i1: [],
      i2: [],
      i3: [],
      sum: [],
      smallarray: [],
      BpChartData: [],
      BpHrChartData: [],
      IChartData: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/record/chart/${this.user.username}`,
          {
            headers: authHeader(),
          }
        );
        this.responseData = response.data;
        this.responseData.forEach((item) => {
          let time = item.recordDate.toString();
          this.BpChartData.push({ x: item.highBp, y: item.lowBp, name: time });
          this.categories.push(item.recordDate);
          this.highBp.push(item.highBp);
          this.lowBp.push(item.lowBp);
          this.hr.push(item.heartbeats);
          this.i1.push(item.i1);
          this.i2.push(item.i2);
          this.i3.push(item.i3);
          this.sum.push(item.i1 + item.i2 + item.i3);
        });
        this.BpHrChartData.categories = this.categories;
        this.BpHrChartData.highBp = this.highBp;
        this.BpHrChartData.lowBp = this.lowBp;
        this.BpHrChartData.hr = this.hr;
        this.IChartData.categories = this.categories;
        this.IChartData.i1 = this.i1;
        this.IChartData.i2 = this.i2;
        this.IChartData.i3 = this.i3;
        this.IChartData.sum = this.sum;
        BpHrChart(this.BpHrChartData);
        BpChart(this.BpChartData);
        IChart(this.IChartData);
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    await this.fetchData();
  },
};
</script>
