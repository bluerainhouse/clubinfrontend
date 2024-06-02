<template>
  <div class="container my-5">
    <div class="card mb-4">
      <div class="card-body">
        <h1 class="card-title">{{ club.name }}</h1>
        <p><strong>Club Class Time：</strong>{{ club.lessonTime }}</p>
        <p><strong>Recent Event：</strong>{{ club.activityTime }}</p>
        <p><strong>Intro：</strong>{{ club.description }}</p>
        <p>
          <strong>Links：</strong>
          <a :href="club.socialLink" target="_blank">{{ club.socialLink }}</a>
        </p>
        <div class="my-3">
          <strong>Photos：</strong>
          <div class="d-flex flex-wrap">
            <img
              v-for="(photo, index) in club.photos"
              :key="index"
              :src="photo.url"
              class="img-thumbnail m-2"
              alt="Club photo"
              style="
                width: 150px;
                height: 150px;
                object-fit: cover;
                cursor: pointer;
              "
              @click="openPreview(photo.url)"
            />
          </div>
        </div>
        <button class="btn btn-primary" @click="editMode = true">Edit</button>
      </div>
    </div>

    <div v-if="editMode" class="card">
      <div class="card-body">
        <h2 class="card-title">Edit Club Info</h2>
        <form @submit.prevent="saveChanges">
          <div class="mb-3">
            <label for="name" class="form-label">Club Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="editableClub.name"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="lessonTime" class="form-label">Club Class Time</label>
            <input
              type="text"
              class="form-control"
              id="lessonTime"
              v-model="editableClub.lessonTime"
              required
            />
          </div>
          <div class="mb-3">
            <label for="activityTime" class="form-label">Recent Event</label>
            <input
              type="text"
              class="form-control"
              id="activityTime"
              v-model="editableClub.activityTime"
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Intro</label>
            <textarea
              class="form-control"
              id="description"
              v-model="editableClub.description"
              rows="3"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="socialLink" class="form-label">Links</label>
            <input
              type="url"
              class="form-control"
              id="socialLink"
              v-model="editableClub.socialLink"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Photos</label>
          </div>
          <div
            v-for="(photo, index) in club.photos"
            :key="index"
            class="d-flex align-items-center mb-2"
          >
            <input
              type="text"
              class="form-control"
              v-model="photo.url"
              placeholder="Enter photo URL"
            />
            <button @click="removePhoto(index)" class="btn btn-danger ms-2">
              Remove
            </button>
          </div>
          <div class="mb-3">
            <button @click="addPhoto" class="btn btn-primary mt-2">
              Add Photo
            </button>
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-success">Save</button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="editMode = false"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 圖片預覽模態框 -->
    <b-modal v-model="showPreview" size="lg" centered>
      <img :src="previewImage" class="img-fluid" alt="Preview" />
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";

const club = ref({
  name: "音樂社",
  lessonTime: "每週二下午 2:00 - 4:00",
  activityTime: "每月第一個週六 5:00 - 7:00",
  description:
    "音樂社是一個專注於音樂學習和表演的社團，歡迎所有對音樂有興趣的同學參加。",
  socialLink: "https://facebook.com/musicclub",
  photos: [{ url: "/dance.jpg" }, { url: "/basketball.jpg" }],
});

const editMode = ref(false);
const editableClub = ref({ ...club.value });
const showPreview = ref(false);
const previewImage = ref("");

// 新增一個新的照片輸入框
const addPhoto = () => {
  editableClub.value.photos.push({ url: "" });
};

// 移除指定索引的照片
const removePhoto = (index) => {
  editableClub.value.photos.splice(index, 1);
};

const saveChanges = () => {
  club.value = { ...editableClub.value };
  editMode.value = false;
};

const openPreview = (url) => {
  previewImage.value = url;
  showPreview.value = true;
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
.img-thumbnail {
  max-width: 100%;
  height: auto;
}
</style>
