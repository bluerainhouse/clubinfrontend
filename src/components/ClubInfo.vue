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
        <div class="card-text" v-if="currentUser">
          <button v-if="!followed" class="btn btn-primary" @click="follow">
            Follow
          </button>
          <button v-if="followed" class="btn btn-secondary" @click="unfollow">
            Unfollow
          </button>
          <button class="btn btn-primary" @click="editMode = true">Edit</button>
        </div>
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
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "axios";
import authHeader from "../services/auth-header";

const router = useRoute();
const store = useStore();

let club = ref({});
let id = ref();
let followId = ref();

const editMode = ref(false);
let editableClub = ref({});
const showPreview = ref(false);
const previewImage = ref("");

const followed = ref(false);
const follow = () => {
  postFollow();
  followed.value = true;
};

const unfollow = () => {
  deleteFollow();
  followed.value = false;
};

const currentUser = computed(() => store.state.auth.user);
// 新增一個新的照片輸入框
const addPhoto = () => {
  editableClub.value.photos.push({ url: "" });
};

// 移除指定索引的照片
const removePhoto = (index) => {
  editableClub.value.photos.splice(index, 1);
  fetchData();
};

const saveChanges = () => {
  club.value = { ...editableClub.value };
  postData();
  editMode.value = false;
};

const openPreview = (url) => {
  previewImage.value = url;
  showPreview.value = true;
};

const fetchData = async (clubId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/club/detail?clubId=${clubId}`,
      { headers: authHeader() }
    );
    club.value = response.data.data;
    id.value = response.data.id;
    editableClub.value = { ...club.value };
  } catch (error) {
    console.error(error);
  }
  axios
    .get(
      `http://localhost:8080/api/star-club/search?userId=${currentUser.value.id}&clubId=${id.value}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      if (response.data != 0) {
        followed.value = true;
        followId.value = parseInt(response.data.id);
      } else {
        followed.value = false;
      }
    })
    .catch((error) => {
      followed.value = false;
      console.error(error);
    });
};
const postData = () => {
  axios
    .post(
      `http://localhost:8080/api/club/update`,
      {
        clubId: id.value,
        data: club.value,
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

const postFollow = () => {
  axios
    .post(
      "http://localhost:8080/api/star-club/",
      {
        user_id: currentUser.value.id,
        club_id: id.value,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      followId.value = response.data.id;
      console.log("保存成功:", response.data);
    })
    .catch((error) => {
      console.error("保存失敗:", error);
    });
};

const deleteFollow = () => {
  axios
    .delete(`http://localhost:8080/api/star-club/${followId.value}`, {
      headers: authHeader(),
    })
    .then((response) => {
      console.log("刪除成功:", response.data);
    })
    .catch((error) => {
      console.error("刪除失敗:", error);
    });
};

onMounted(() => {
  const clubId = router.params.clubId;
  fetchData(clubId);
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
.img-thumbnail {
  max-width: 100%;
  height: auto;
}
</style>
