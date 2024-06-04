<!-- src/components/AnnouncementList.vue -->
<template>
  <div class="container my-5">
    <!-- 篩選按鈕 -->
    <h2>Announcements</h2>
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-warning" @click="fetchAllData">All</button>
      <button class="btn btn-secondary" @click="fetchStarredData">
        Starred
      </button>
      <button class="btn btn-secondary" @click="fetchFollowingData">
        Following
      </button>

      <router-link to="/announcementEdit" class="btn btn-primary"
        >Post</router-link
      >
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
          <tr v-for="(announcement, index) in announcements" :key="index">
            <td>{{ announcement.date }}</td>
            <td>
              <router-link :to="`/announcement-detail/${announcement.id}`">
                {{ announcement.title }}
              </router-link>
            </td>
            <td>{{ announcement.clubName }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import authHeader from "../services/auth-header";

// 公告數據
let announcements = ref([]);
const store = useStore();
const currentUser = computed(() => store.state.auth.user);

const fetchAllData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/ano/all", {
      headers: authHeader(),
    });
    announcements.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchStarredData = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/ano/search?userId=${currentUser.value.id}`,
      {
        headers: authHeader(),
      }
    );
    announcements.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchFollowingData = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/ano/starClub?userId=${currentUser.value.id}`,
      {
        headers: authHeader(),
      }
    );
    announcements.value = response.data;
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
