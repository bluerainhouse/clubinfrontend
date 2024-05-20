<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">進階血壓計量測分析服務</a>
    <div class="navbar-nav mr-auto">
      <li v-if="currentUser" class="nav-item">
        <router-link to="/record" class="nav-link">量測紀錄</router-link>
      </li>
      <li v-if="!currentUser" class="nav-item">
        <router-link to="/graph-example" class="nav-link">
          範例圖表
        </router-link>
      </li>
      <li v-if="currentUser" class="nav-item">
        <router-link to="/graph" class="nav-link"> 圖表 </router-link>
      </li>
    </div>

    <div v-if="!currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/register" class="nav-link">
          <font-awesome-icon icon="user-plus" /> 註冊
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/login" class="nav-link">
          <font-awesome-icon icon="sign-in-alt" /> 登入
        </router-link>
      </li>
    </div>

    <div v-if="currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/profile" class="nav-link">
          <font-awesome-icon icon="user" />
          {{ currentUser.username }}
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click.prevent="logOut">
          <font-awesome-icon icon="sign-out-alt" /> 登出
        </a>
      </li>
    </div>
  </nav>
  <div class="container">
    <router-view :user="currentUser" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNavbarOpen: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
