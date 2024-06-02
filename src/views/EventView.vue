<template>
  <div class="container my-5">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">{{ event.name }}</h1>
        <p class="card-text"><strong>社團名稱：</strong>{{ event.club }}</p>
        <p class="card-text"><strong>時間：</strong>{{ event.time }}</p>
        <p class="card-text"><strong>內容：</strong>{{ event.description }}</p>
        <p class="card-text"><strong>費用：</strong>{{ event.fee }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const event = ref({
  name: "音樂會",
  club: "音樂社",
  time: "2024年6月15日 下午7:00 - 9:00",
  description: "音樂社舉辦的年度音樂會，包括各種音樂表演、舞台劇等精彩節目。",
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
