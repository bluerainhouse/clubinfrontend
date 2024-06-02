<template>
  <div class="container">
    <header class="jumbotron my-4">
      <h3>Profile</h3>
    </header>
    <div class="card mb-4">
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <label for="name" class="col-sm-2 col-form-label">Full Name</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="userInfo.name"
                required
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="studentId" class="col-sm-2 col-form-label"
              >Student ID</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="studentId"
                v-model="currentUser.username"
                disabled
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="clubName" class="col-sm-2 col-form-label"
              >Club Name</label
            >
            <div class="col-sm-10">
              <select
                class="form-select"
                aria-label="Default select example"
                id="clubName"
                v-model="userInfo.clubName"
                required
              >
                <option value="" disabled>Select a club</option>
                <option v-for="club in clubs" :key="club" :value="club">
                  {{ club }}
                </option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <label for="bio" class="col-sm-2 col-form-label">Self Intro</label>
            <div class="col-sm-10">
              <textarea
                class="form-control"
                id="bio"
                v-model="userInfo.bio"
                rows="4"
                required
              ></textarea>
            </div>
          </div>
          <div class="row mb-3">
            <label for="profileImage" class="col-sm-2 col-form-label"
              >Thumbnail</label
            >
            <div class="col-sm-10">
              <input
                type="file"
                class="form-control"
                id="profileImage"
                @change="handleFileUpload"
              />
              <img
                v-if="userInfo.image"
                :src="userInfo.image"
                class="img-fluid mt-3"
                alt="Profile Image"
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const currentUser = computed(() => store.state.auth.user);

const userInfo = ref({
  name: "",
  studentId: "",
  clubName: "",
  bio: "",
  image: "",
});

const clubs = ref(["學生會", "音樂社", "環保社"]);

onMounted(() => {
  if (!currentUser.value) {
    router.push("/login");
  } else {
    // 初始化用戶信息
    userInfo.value.name = currentUser.value.name || "";
    userInfo.value.studentId = currentUser.value.studentId || "";
    userInfo.value.clubName = currentUser.value.clubName || "";
    userInfo.value.bio = currentUser.value.bio || "";
    userInfo.value.image = currentUser.value.image || "";
  }
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    userInfo.value.image = e.target.result;
  };
  reader.readAsDataURL(file);
};

const submitForm = () => {
  // 更新用戶信息
  store.commit("auth/updateUser", userInfo.value);
  alert("用戶信息已更新");
};
</script>

<style scoped>
.container {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.jumbotron {
  padding: 2rem 1rem;
  background-color: #e9ecef;
  border-radius: 0.3rem;
}
.card {
  border: none;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
.card-body {
  padding: 2rem;
}
.img-fluid {
  max-width: 150px;
  height: auto;
}
</style>
