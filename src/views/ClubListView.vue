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

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import authHeader from "../services/auth-header";

// 定義 reactive 變數
const store = useStore();
const responseData = ref([]);
const showTable = ref(false);
const toggleAll = ref(false);
const currentUser = computed(() => store.state.auth.user);

// 定義計算屬性 admin
const admin = computed(() => {
  if (currentUser.value) {
    return currentUser.value.roles.includes("ROLE_ADMIN");
  }
  return false;
});

// 獲取數據的方法
const fetchData = () => {
  axios
    .get(
      `http://localhost:8080/api/record/chart/${currentUser.value.username}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      responseData.value = response.data;
      showTable.value = response.data.length > 0;
    })
    .catch((error) => {
      console.error(error);
    });
  toggleAll.value = false;
};

// 獲取所有數據的方法
const fetchAllData = () => {
  axios
    .get("http://localhost:8080/api/record/allchart", {
      headers: authHeader(),
    })
    .then((response) => {
      responseData.value = response.data;
      showTable.value = response.data.length > 0;
      toggleAll.value = true;
    })
    .catch((error) => {
      console.error(error);
    });
};

// 刪除項目的方法
const deleteItem = (recordId) => {
  axios
    .delete(`http://localhost:8080/api/record/${recordId}`, {
      headers: authHeader(),
    })
    .then(() => {
      fetchData(); // 刪除成功後刷新資料
    })
    .catch((error) => {
      console.error(error);
    });
};

// 在組件掛載時自動調用 fetchData
onMounted(fetchData);
</script>
