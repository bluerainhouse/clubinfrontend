<template>
  <div class="container my-5">
    <h1 class="mb-4">社團列表</h1>
    <div v-for="(clubs, type) in categorizedClubs" :key="type" class="mb-5">
      <h2 class="mb-3">{{ type }}</h2>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="club in clubs" :key="club.id">
          <div class="card h-100">
            <img
              :src="'/' + club.clubName + '.jpg'"
              class="card-img-top"
              :alt="club.clubName"
            />
            <div class="card-body">
              <h5 class="card-title">{{ club.fullName }}</h5>
            </div>
            <div class="card-footer">
              <router-link :to="'/club/' + club.id" class="btn btn-primary"
                >Detail</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import authHeader from "../services/auth-header";

const clubs = ref([]);
const categorizedClubs = ref({});

const fetchData = () => {
  axios
    .get(`http://localhost:8080/api/club/all`, {
      headers: authHeader(),
    })
    .then((response) => {
      clubs.value = response.data;
      clubs.value.forEach((club) => {
        if (!categorizedClubs.value[club.type]) {
          categorizedClubs.value[club.type] = [];
        }
        categorizedClubs.value[club.type].push(club);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.container {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
