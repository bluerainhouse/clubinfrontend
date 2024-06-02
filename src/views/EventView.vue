<template>
  <div class="container my-5">
    <!-- 活動展示卡片 -->
    <div v-if="!editMode" class="card">
      <div class="card-body">
        <h1 class="card-title">{{ event.name }}</h1>
        <p class="card-text"><strong>社團名稱：</strong>{{ event.club }}</p>
        <p class="card-text"><strong>Date：</strong>{{ event.date }}</p>
        <p class="card-text"><strong>時間：</strong>{{ event.time }}</p>
        <p class="card-text"><strong>內容：</strong>{{ event.description }}</p>
        <p class="card-text"><strong>費用：</strong>{{ event.fee }}</p>
        <p v-if="notFollowed" class="card-text">
          <button class="btn btn-primary" @click="follow">Follow</button>
        </p>
        <p v-if="!notFollowed" class="card-text">Followed</p>
        <button class="btn btn-primary" @click="editMode = true">編輯</button>
      </div>
    </div>

    <!-- 活動編輯卡片 -->
    <div v-if="editMode" class="card">
      <div class="card-body">
        <h2 class="card-title">編輯活動信息</h2>
        <form @submit.prevent="saveChanges">
          <div class="mb-3">
            <label for="name" class="form-label">活動名稱</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="editableEvent.name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="club" class="form-label">社團名稱</label>
            <input
              type="text"
              class="form-control"
              id="club"
              v-model="editableEvent.club"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">日期</label>
            <input
              type="date"
              class="form-control"
              id="dage"
              v-model="editableEvent.date"
              required
            />
          </div>
          <div class="mb-3">
            <label for="time" class="form-label">時間</label>
            <input
              type="text"
              class="form-control"
              id="time"
              v-model="editableEvent.time"
              required
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">內容</label>
            <textarea
              class="form-control"
              id="description"
              v-model="editableEvent.description"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="fee" class="form-label">費用</label>
            <input
              type="text"
              class="form-control"
              id="fee"
              v-model="editableEvent.fee"
              required
            />
          </div>
          <button type="submit" class="btn btn-success">儲存</button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="editMode = false"
          >
            取消
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const event = ref({
  name: "音樂會",
  club: "音樂社",
  date: "2024-06-15",
  time: "下午7:00 - 9:00",
  description: "音樂社舉辦的年度音樂會，包括各種音樂表演、舞台劇等精彩節目。",
  fee: "免費參加",
});

const notFollowed = ref(true);

const editMode = ref(false);
const editableEvent = ref({ ...event.value });

const saveChanges = () => {
  event.value = { ...editableEvent.value };
  editMode.value = false;
};

const follow = () => {
  notFollowed.value = false;
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
  margin-bottom: 0.5rem;
}
</style>
