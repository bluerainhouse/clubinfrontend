<template>
  <div class="container my-5">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">編輯公告</h1>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input
              type="text"
              id="title"
              class="form-control"
              v-model="announcement.title"
              required
            />
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">內容</label>
            <textarea
              id="content"
              class="form-control"
              v-model="announcement.content"
              rows="5"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">日期</label>
            <input
              type="date"
              id="date"
              class="form-control"
              v-model="announcement.date"
              required
            />
          </div>
          <div class="mb-3">
            <label for="clubName" class="form-label">社團名稱</label>
            <select
              id="clubName"
              class="form-select"
              v-model="announcement.clubName"
              required
            >
              <option value="">請選擇社團</option>
              <option v-for="club in clubs" :key="club" :value="club">
                {{ club }}
              </option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">保存</button>
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
            <h5 class="modal-title" id="successModalLabel">成功</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">公告已成功保存！</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="navigateToAnnouncements"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";

const announcement = ref({
  title: "",
  content: "",
  date: "",
  clubName: "",
});

const clubs = ref(["學生會", "音樂社", "環保社"]);

const router = useRouter();
let successModal = null;

const submitForm = () => {
  // 模擬保存公告的功能
  console.log("保存公告:", announcement.value);
  // 在此處添加保存至後端的邏輯，例如 API 調用
  // axios.post('/api/announcements', announcement.value)
  //   .then(response => {
  //     console.log('保存成功:', response.data);
  //   })
  //   .catch(error => {
  //     console.error('保存失敗:', error);
  //   });

  // 顯示成功彈窗
  const modalElement = document.getElementById("successModal");
  successModal = new Modal(modalElement);
  successModal.show();
};

const navigateToAnnouncements = () => {
  if (successModal) {
    successModal.hide();
  }
  router.push("/announcement");
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
.form-control,
.form-select {
  margin-top: 0.5rem;
}
.btn-primary {
  margin-top: 1rem;
}
</style>
