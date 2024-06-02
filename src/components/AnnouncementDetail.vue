<template>
  <div class="container my-5">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">{{ announcement.title }}</h1>
        <p class="card-text">{{ announcement.content }}</p>
        <p class="card-text"><strong>日期:</strong> {{ announcement.date }}</p>
        <p class="card-text">
          <strong>社團名稱:</strong> {{ announcement.clubName }}
        </p>
        <p v-if="notStarred" class="card-text">
          <button class="btn btn-primary" @click="star">Star</button>
        </p>
        <p v-if="!notStarred" class="card-text">Starred</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

// 使用 reactive 定義 announcement
const announcement = reactive({
  title: "公告標題",
  content: "公告內容",
  date: "2024-06-01",
  clubName: "社團名稱",
});

const notStarred = ref(true);

const star = () => {
  notStarred.value = false;
};
</script>

<style scoped>
.container {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.card {
  border: none;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
.card-body {
  padding: 2rem;
}
.card-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.card-text {
  font-size: 1.2rem;
  color: #333;
}
.list-group-item {
  border: none;
}
</style>
