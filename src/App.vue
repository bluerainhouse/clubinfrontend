<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">Club Info Platform</a>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/announcements" class="nav-link">
          Announcements
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/clubs" class="nav-link"> Clubs </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/calendar" class="nav-link"> Calendar </router-link>
      </li>
      <li v-if="currentUser" class="nav-item">
        <router-link to="/activities" class="nav-link">
          Activities
        </router-link>
      </li>
    </div>

    <div v-if="!currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/register" class="nav-link">
          <font-awesome-icon icon="user-plus" /> Sign Up
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/login" class="nav-link">
          <font-awesome-icon icon="sign-in-alt" /> Login
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
          <font-awesome-icon icon="sign-out-alt" /> Logout
        </a>
      </li>
    </div>
  </nav>
  <div class="container">
    <router-view :user="currentUser" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const currentUser = computed(() => store.state.auth.user);

function logOut() {
  store.dispatch("auth/logout");
  router.push("/login");
}
</script>
