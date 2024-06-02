<template>
  <div class="container my-5">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">{{ announcement.title }}</h1>
        <p class="card-text">{{ announcement.content }}</p>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <strong>日期:</strong> {{ announcement.date }}
          </li>
          <li class="list-group-item">
            <strong>社團名稱:</strong> {{ announcement.clubName }}
          </li>
          <li class="list-group-item">
            <strong>已收藏:</strong>
            <i
              v-if="announcement.isBookmarked"
              class="bi bi-star-fill text-warning"
            ></i>
            <i v-else class="bi bi-star text-secondary"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      announcement: {
        title: "公告標題",
        content: "公告內容",
        date: "2024-06-01",
        clubName: "社團名稱",
        isBookmarked: false,
      },
    };
  },
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
