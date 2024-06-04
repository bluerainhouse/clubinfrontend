<template>
  <div class="container my-5">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">{{ announcement.title }}</h1>
        <p class="card-text">{{ announcement.content }}</p>
        <p class="card-text"><strong>Date:</strong> {{ announcement.date }}</p>
        <p class="card-text">
          <strong>Club Name:</strong> {{ announcement.clubName }}
        </p>
        <div v-if="currentUser">
          <p v-if="!starred" class="card-text">
            <button class="btn btn-primary" @click="starred = true">
              Star
            </button>
          </p>
          <p v-if="starred" class="card-text">Starred</p>
          <br />
          <p class="card-text">
            <button class="btn btn-primary" @click="editMode = true">
              Edit
            </button>
          </p>
        </div>
        <br />
        <p class="card-text">
          <router-link to="/announcement" class="btn btn-secondary"
            >Back</router-link
          >
        </p>
      </div>
    </div>
    <br />
    <!-- 活動編輯卡片 -->
    <div v-if="editMode" class="card">
      <div class="card-body">
        <h2 class="card-title">Edit Club Class</h2>
        <form @submit.prevent="saveChanges">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="editableAno.title"
              required
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Content</label>
            <textarea
              class="form-control"
              id="description"
              v-model="editableAno.content"
              rows="3"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">Date</label>
            <input
              type="date"
              class="form-control"
              id="date"
              v-model="editableAno.date"
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
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "axios";
import authHeader from "../services/auth-header";

const router = useRoute();
const store = useStore();
let id = ref();
const editMode = ref(false);

// 使用 reactive 定義 announcement
const announcement = ref({});
let editableAno = ref({ ...announcement.value });
let starred = ref();

const currentUser = computed(() => store.state.auth.user);

const fetchData = (anoId) => {
  axios
    .get(`http://localhost:8080/api/ano/get?anoId=${anoId}`, {
      headers: authHeader(),
    })
    .then((response) => {
      announcement.value = response.data;
      editableAno.value = { ...announcement.value };
      id.value = anoId;
    })
    .catch((error) => {
      console.error(error);
    });
  axios
    .get(
      `http://localhost:8080/api/star/get?userId=${currentUser.value.id}?anoId=${anoId}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      if (response.data != 0) {
        starred = true;
      } else {
        starred = false;
      }
    })
    .catch((error) => {
      starred = false;
      console.error(error);
    });
};
const putData = () => {
  axios
    .put(
      `http://localhost:8080/api/ano/${id.value}`,
      {
        title: announcement.value.title,
        content: announcement.value.content,
        date: announcement.value.date,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      console.log("保存成功:", response.data);
    })
    .catch((error) => {
      console.error("保存失敗:", error);
    });
};

const saveChanges = () => {
  announcement.value = { ...editableAno.value };
  putData();
  editMode.value = false;
};

onMounted(() => {
  const actId = router.params.anoId;
  fetchData(actId);
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
  color: #333;
}
.list-group-item {
  border: none;
}
</style>
