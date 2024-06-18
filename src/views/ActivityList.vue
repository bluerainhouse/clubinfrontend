<!-- src/components/AnnouncementList.vue -->
<template>
  <div class="container my-5">
    <!-- 篩選按鈕 -->
    <h2>Activities</h2>
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-warning" @click="fetchAllData">All</button>
      <button class="btn btn-secondary" @click="fetchEventData">Events</button>
      <button class="btn btn-secondary" @click="fetchClubClassData">
        Club Classes
      </button>

      <router-link to="/newActivity" class="btn btn-primary">Post</router-link>
    </div>

    <!-- 公告列表 -->
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col" class="col-date">Date</th>
            <th scope="col" class="col-title">Title</th>
            <th scope="col" class="col-club">Club Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(activity, index) in activities" :key="index">
            <td>{{ activity.type }}</td>
            <td>
              <router-link :to="`/activity/${activity.id}`">
                {{ activity.title }}
              </router-link>
            </td>
            <td>{{ activity.clubName }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import authHeader from "../services/auth-header";

// 公告數據
let activities = ref([]);

const fetchAllData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/act/all", {
      headers: authHeader(),
    });
    activities.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchEventData = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/act/search?type=Event",
      {
        headers: authHeader(),
      }
    );
    activities.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchClubClassData = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/act/search?type=Club Class",
      {
        headers: authHeader(),
      }
    );
    activities.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchAllData();
});
</script>

<style scoped>
.my-5 {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.table-responsive {
  overflow-x: auto;
}
.col-date {
  width: 25%;
}
.col-title {
  width: 50%;
}
.col-club {
  width: 15%;
}
.col-bookmarked {
  width: 10%;
}
.text-center {
  text-align: center;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
