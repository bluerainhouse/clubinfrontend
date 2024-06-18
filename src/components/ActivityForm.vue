<template>
  <div class="container my-5">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">Add Event/Club Class</h1>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
              type="text"
              id="title"
              class="form-control"
              v-model="activity.title"
              required
            />
          </div>
          <div class="mb-3">
            <label for="detail" class="form-label">Detail</label>
            <textarea
              id="detail"
              class="form-control"
              v-model="activity.detail"
              rows="5"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="clubName" class="form-label">Club Name</label>
            <select
              id="clubName"
              class="form-select"
              v-model="activity.clubId"
              required
            >
              <option value="">Select a club</option>
              <option v-for="club in clubs" :key="club" :value="club.id">
                {{ club.fullName }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="type" class="form-label">Type</label>
            <select
              id="type"
              class="form-select"
              v-model="activity.type"
              required
            >
              <option value="">Select Type</option>
              <option v-for="type in types" :key="type" :value="type.name">
                {{ type.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">Start Date</label>
            <input
              type="date"
              class="form-control"
              id="date"
              v-model="activity.startDate"
              required
            />
          </div>
          <div class="mb-3">
            <label for="time" class="form-label">Start Time</label>
            <input
              type="time"
              class="form-control"
              id="time"
              v-model="activity.startTime"
              required
            />
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">End Date</label>
            <input
              type="date"
              class="form-control"
              id="date"
              v-model="activity.endDate"
              required
            />
          </div>
          <div class="mb-3">
            <label for="time" class="form-label">End Time</label>
            <input
              type="time"
              class="form-control"
              id="time"
              v-model="activity.endTime"
              required
            />
          </div>
          <div class="mb-3">
            <label for="fee" class="form-label">Fee</label>
            <input
              type="text"
              class="form-control"
              id="fee"
              v-model="activity.fee"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
    </div>

    <!-- 成功彈窗 -->
    <div
      class="modal fade"
      id="successModal"
      tabindex="-1"
      aria-labelledby="successModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successModalLabel">Success</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Saved!</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="navigateToCalendar"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
import axios from "axios";
import authHeader from "../services/auth-header";

let activity = ref({
  title: "",
  detail: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  clubId: "",
  type: "",
});

let types = [{ name: "Club Class" }, { name: "Event" }];

let clubs = ref([]);

const router = useRouter();
let successModal = null;

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/club/all", {
      headers: authHeader(),
    });
    clubs.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const postData = () => {
  axios
    .post(
      `http://localhost:8080/api/act/`,
      {
        clubId: activity.value.clubId,
        title: activity.value.title,
        start_date: activity.value.startDate,
        start_time: activity.value.startTime,
        end_date: activity.value.endDate,
        end_time: activity.value.endTime,
        detail: activity.value.detail,
        fee: activity.value.fee,
        type: activity.value.type,
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

const submitForm = () => {
  const modalElement = document.getElementById("successModal");
  postData();
  successModal = new Modal(modalElement);
  successModal.show();
};

const navigateToCalendar = () => {
  if (successModal) {
    successModal.hide();
  }
  router.push("/calendar");
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
.form-control,
.form-select {
  margin-top: 0.5rem;
}
.btn-primary {
  margin-top: 1rem;
}
</style>
