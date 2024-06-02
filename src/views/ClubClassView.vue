<template>
  <div class="container my-5">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">{{ clubClass.title }}</h1>
        <p class="card-text">
          <strong>Club Name：</strong>{{ clubClass.name }}
        </p>
        <p class="card-text">
          <strong>Held on：</strong>{{ clubClass.schedule }}
        </p>
        <p class="card-text">
          <strong>Detail：</strong>{{ clubClass.description }}
        </p>
        <p class="card-text"><strong>Fee：</strong>{{ clubClass.fee }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const clubClass = ref({
  title: "音樂社社課",
  name: "音樂社",
  schedule: "每週二下午 2:00 - 4:00",
  description:
    "音樂社是一個專注於音樂學習和表演的社團，歡迎所有對音樂有興趣的同學參加。",
  fee: "免費參加",
});
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
  margin-bottom: 0.5rem;
}
</style>
