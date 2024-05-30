<template>
  <div class="container">
    <div class="row">
      <a
        class="btn btn-primary"
        v-if="admin && !toggleAll"
        @click="fetchAllData"
        >查看全部紀錄</a
      >
      <a class="btn btn-primary" v-if="toggleAll" @click="fetchData"
        >查看個人紀錄</a
      >
    </div>
    <div class="row">
      <table class="table table-hover" v-if="showTable">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">使用者名稱</th>
            <th scope="col">日期</th>
            <th scope="col">收縮壓</th>
            <th scope="col">舒張壓</th>
            <th scope="col">脈搏</th>
            <th scope="col">i1</th>
            <th scope="col">i2</th>
            <th scope="col">i3</th>
            <th scope="col">詳細內容</th>
            <th scope="col" v-if="admin">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in responseData" :key="index">
            <td>{{ record.id }}</td>
            <td>{{ record.login }}</td>
            <td>{{ record.recordDate }}</td>
            <td>{{ record.highBp }}</td>
            <td>{{ record.lowBp }}</td>
            <td>{{ record.heartbeats }}</td>
            <td>{{ record.i1 }}</td>
            <td>{{ record.i2 }}</td>
            <td>{{ record.i3 }}</td>
            <td>
              <router-link
                :to="`/record-detail/${record.id}`"
                class="btn btn-success"
                >詳細內容</router-link
              >
            </td>
            <td>
              <a
                v-if="admin"
                class="btn btn-danger"
                @click="deleteItem(record.id)"
                >刪除</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="row" v-if="!showTable">
      <h3>沒有量測記錄</h3>
    </div>
  </div>
</template>

<style>
.container {
  width: 80%;
}
</style>

<script>
import axios from "axios";
import authHeader from "../services/auth-header";

export default {
  name: "RecordView",
  computed: {
    admin() {
      if (this.user) {
        return this.user.roles.includes("ROLE_ADMIN");
      }

      return false;
    },
  },
  props: ["user"],
  data() {
    return {
      responseData: [],
      showTable: false,
      toggleAll: false,
    };
  },
  methods: {
    fetchData() {
      // 使用 Axios 發送 GET 請求
      axios
        .get(`http://localhost:8080/api/record/chart/${this.user.username}`, {
          headers: authHeader(),
        })
        .then((response) => {
          // 成功處理返回的數據
          this.responseData = response.data;
          // 用魔法打敗魔法 不能設成"[]"
          if (response.data != 0) {
            this.showTable = true;
          } else {
            this.showTable = false;
          }
        })
        .catch((error) => {
          // 處理錯誤
          console.error(error);
        });
      this.toggleAll = false;
    },
    fetchAllData() {
      // 使用 Axios 發送 GET 請求
      axios
        .get("http://localhost:8080/api/record/allchart", {
          headers: authHeader(),
        })
        .then((response) => {
          // 成功處理返回的數據
          this.responseData = response.data;
          // 用魔法打敗魔法 不能設成"[]"
          if (response.data != 0) {
            this.showTable = true;
          } else {
            this.showTable = false;
          }
          this.toggleAll = true;
        })
        .catch((error) => {
          // 處理錯誤
          console.error(error);
        });
    },
    deleteItem(recordId) {
      axios
        .delete(`http://localhost:8080/api/record/${recordId}`, {
          headers: authHeader(),
        })
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.fetchData(); // 刪除成功後刷新資料
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
