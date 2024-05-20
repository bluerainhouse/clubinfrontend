<template>
  <div class="container">
    <div class="wrapper">
      <div class="row">
        <div>
          <h2>心臟測量結果</h2>
        </div>
        <div class="col">
          <div class="small">i1 心律雜訊</div>
          <div class="small">i2 瓣膜雜訊</div>
          <div class="small">i3 冠狀動脈雜訊</div>
        </div>
        <div class="col">
          <div>
            <h2 class="safe" v-if="record.i1 == 0">{{ record.i1 }}</h2>
            <h2 class="middle" v-if="record.i1 > 0 && record.i1 < 3">
              {{ record.i1 }}
            </h2>
            <h2 class="danger" v-if="record.i1 >= 3">{{ record.i1 }}</h2>
          </div>
          <div>
            <h2 class="safe" v-if="record.i2 == 0">{{ record.i2 }}</h2>
            <h2 class="middle" v-if="record.i2 > 0 && record.i2 < 3">
              {{ record.i2 }}
            </h2>
            <h2 class="danger" v-if="record.i2 >= 3">{{ record.i2 }}</h2>
          </div>
          <div>
            <h2 class="safe" v-if="record.i3 == 0">{{ record.i3 }}</h2>
            <h2 class="middle" v-if="record.i3 > 0 && record.i3 < 3">
              {{ record.i3 }}
            </h2>
            <h2 class="danger" v-if="record.i3 >= 3">{{ record.i3 }}</h2>
          </div>
        </div>
      </div>

      <div class="row">
        <div>
          <h2>關於i1、i2、i3</h2>
        </div>
        <div class="col">
          <div><h2 class="safe">0</h2></div>
          <div><h2 class="middle">1~3</h2></div>
          <div><h2 class="danger">3以上</h2></div>
        </div>
        <div class="col">
          <div class="small">健康</div>
          <div class="small">須注意</div>
          <div class="small">建議就醫</div>
        </div>
      </div>

      <div class="row">
        <div>
          <h2>血壓測量結果</h2>
        </div>
        <div class="col">
          <div class="small">收縮壓</div>
          <div class="small">舒張壓</div>
          <div class="small">心跳</div>
        </div>
        <div class="col">
          <div>
            <h2 class="safe" v-if="record.highBp < 120">{{ record.highBp }}</h2>
            <h2
              class="middle"
              v-if="record.highBp >= 120 && record.highBp < 160"
            >
              {{ record.highBp }}
            </h2>
            <h2 class="danger" v-if="record.highBp >= 160">
              {{ record.highBp }}
            </h2>
          </div>
          <div>
            <h2 class="safe" v-if="record.lowBp < 80">{{ record.lowBp }}</h2>
            <h2 class="middle" v-if="record.lowBp >= 80 && record.lowBp < 100">
              {{ record.lowBp }}
            </h2>
            <h2 class="danger" v-if="record.lowBp >= 100">
              {{ record.lowBp }}
            </h2>
          </div>
          <div>
            <h2 style="color: blue">{{ record.heartbeats }}</h2>
          </div>
        </div>
      </div>

      <div class="row">
        <div>
          <h2>關於血壓</h2>
        </div>
        <div class="col">
          <div class="small" style="color: blue; font-weight: bold">
            高血壓說明
          </div>
          <div class="small" style="color: blue; font-weight: bold">收縮壓</div>
          <div class="small" style="color: blue; font-weight: bold">舒張壓</div>
        </div>
        <div class="col">
          <div class="small">第二期高血壓</div>
          <div class="small" style="color: red">>160</div>
          <div class="small" style="color: red">>100</div>
        </div>
        <div class="col">
          <div class="small">第一期高血壓</div>
          <div class="small" style="color: rgb(255, 128, 64)">140-159</div>
          <div class="small" style="color: rgb(255, 128, 64)">90-99</div>
        </div>
      </div>

      <div class="row">
        <div>
          <h2>量測時間</h2>
        </div>
        <div>
          <h2 class="big">{{ record.recordDate }}</h2>
        </div>
        <div>
          <br />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="small">前期高血壓</div>
          <div class="small" style="color: rgb(255, 128, 64)">120-139</div>
          <div class="small" style="color: rgb(255, 128, 64)">80-89</div>
        </div>
        <div class="col">
          <div class="small">正常</div>
          <div class="small" style="color: green">90-119</div>
          <div class="small" style="color: green">60-79</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import authHeader from "../services/auth-header";

export default {
  name: "RecordDetailView",
  data() {
    return {
      record: [],
      showTable: false,
    };
  },
  methods: {
    fetchData(id) {
      // 使用 Axios 發送 GET 請求
      axios
        .get(`http://localhost:8080/api/record/${id}`, {
          headers: authHeader(),
        })
        .then((response) => {
          // 成功處理返回的數據
          this.record = response.data;
        })
        .catch((error) => {
          // 處理錯誤
          console.error(error);
        });
    },
  },
  mounted() {
    const recordId = this.$route.params.recordId;
    this.fetchData(recordId);
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.6) !important;
}

.container {
  display: grid;
}

.row {
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.col {
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

.small {
  font-size: 120%;
}

div {
  text-align: center;
  font-weight: bold;
}

h2 {
  font-weight: bold;
}
</style>
