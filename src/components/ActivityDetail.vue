<template>
  <div class="container my-5">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">{{ clubClass.title }}</h1>
        <p class="card-text">
          <strong>Club Name：</strong>{{ clubClass.clubName }}
        </p>
        <p class="card-text">
          <strong>Start Date：</strong>{{ clubClass.startDate }}
          {{ clubClass.startTime }}
        </p>
        <p class="card-text">
          <strong>End date：</strong>{{ clubClass.endDate }}
          {{ clubClass.endTime }}
        </p>
        <p class="card-text"><strong>Detail：</strong>{{ clubClass.detail }}</p>
        <p class="card-text"><strong>Type：</strong>{{ clubClass.type }}</p>
        <p class="card-text"><strong>Fee：</strong>{{ clubClass.fee }}</p>
        <button class="btn btn-primary" @click="editMode = true">Edit</button>
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
              v-model="editableClass.title"
              required
            />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Club Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="editableClass.clubName"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">Start Date</label>
            <input
              type="date"
              class="form-control"
              id="date"
              v-model="editableClass.startDate"
              required
            />
          </div>
          <div class="mb-3">
            <label for="time" class="form-label">Start Time</label>
            <input
              type="time"
              class="form-control"
              id="time"
              v-model="editableClass.startTime"
              required
            />
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">End Date</label>
            <input
              type="date"
              class="form-control"
              id="date"
              v-model="editableClass.endDate"
              required
            />
          </div>
          <div class="mb-3">
            <label for="time" class="form-label">End Time</label>
            <input
              type="time"
              class="form-control"
              id="time"
              v-model="editableClass.endTime"
              required
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Detail</label>
            <textarea
              class="form-control"
              id="description"
              v-model="editableClass.detail"
              rows="3"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="type" class="form-label">Type</label>
            <input
              type="text"
              class="form-control"
              id="type"
              v-model="editableClass.type"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="fee" class="form-label">Fee</label>
            <input
              type="text"
              class="form-control"
              id="fee"
              v-model="editableClass.fee"
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import authHeader from "../services/auth-header";

const router = useRoute();
let clubClass = ref({});

let id = ref();

const editMode = ref(false);
let editableClass = ref({});

const fetchData = (actId) => {
  axios
    .get(`http://localhost:8080/api/act/get?actId=${actId}`, {
      headers: authHeader(),
    })
    .then((response) => {
      clubClass.value = response.data;
      id.value = actId;
      editableClass.value = { ...clubClass.value };
    })
    .catch((error) => {
      console.error(error);
    });
};

const putData = () => {
  axios
    .put(
      `http://localhost:8080/api/act/${id.value}`,
      {
        start_date: clubClass.value.startDate,
        start_time: clubClass.value.startTime,
        end_date: clubClass.value.endDate,
        end_time: clubClass.value.endTime,
        title: clubClass.value.title,
        detail: clubClass.value.detail,
        fee: clubClass.value.fee,
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
  clubClass.value = { ...editableClass.value };
  putData();
  editMode.value = false;
};

onMounted(() => {
  const actId = router.params.actId;
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
  margin-bottom: 0.5rem;
}
</style>
