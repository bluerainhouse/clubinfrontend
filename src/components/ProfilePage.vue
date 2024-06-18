<template>
  <div class="container">
    <header class="jumbotron my-4">
      <h3>Profile</h3>
    </header>
    <div class="card mb-4">
      <div class="card-body">
        <form @submit.prevent="submitForm">
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
            <label for="name" class="col-sm-2 col-form-label">Full Name</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="userInfo.fullName"
                required
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="email" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="userInfo.email"
                required
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="clubName" class="col-sm-2 col-form-label"
              >My Club</label
            >
            <div class="col-sm-10">
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="userInfo.clubId"
                required
              >
                <option value="" disabled>Select a club</option>
                <option v-for="club in clubs" :key="club" :value="club.id">
                  {{ club.fullName }}
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
                v-model="userInfo.selfIntro"
                rows="4"
                required
              ></textarea>
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
import axios from "axios";
import authHeader from "../services/auth-header";

const store = useStore();
const router = useRouter();
const currentUser = computed(() => store.state.auth.user);

const userInfo = ref({});

const clubs = ref();

onMounted(() => {
  if (!currentUser.value) {
    router.push("/login");
  } else {
    // 初始化用戶信息
    fetchData();
    fetchClubs();
  }
});

const fetchData = () => {
  axios
    .get(
      `http://localhost:8080/api/user/detail?userId=${currentUser.value.id}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      userInfo.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const fetchClubs = () => {
  axios
    .get("http://localhost:8080/api/club/all", {
      headers: authHeader(),
    })
    .then((response) => {
      clubs.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const postData = () => {
  axios
    .post(
      `http://localhost:8080/api/user/update`,
      {
        userId: currentUser.value.id,
        fullName: userInfo.value.fullName,
        clubId: userInfo.value.clubId,
        selfIntro: userInfo.value.selfIntro,
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
  // 更新用戶信息
  store.commit("auth/updateUser", userInfo.value);
  postData();
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
