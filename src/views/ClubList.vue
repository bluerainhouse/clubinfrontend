<template>
  <div class="container my-5">
    <h1 class="mb-4">社團列表</h1>
    <div
      v-for="(clubs, category) in categorizedClubs"
      :key="category"
      class="mb-5"
    >
      <h2 class="mb-3">{{ category }}</h2>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="club in clubs" :key="club.id">
          <div class="card h-100">
            <img :src="club.image" class="card-img-top" :alt="club.name" />
            <div class="card-body">
              <h5 class="card-title">{{ club.name }}</h5>
              <p class="card-text">{{ club.description }}</p>
            </div>
            <div class="card-footer">
              <router-link :to="'/club/' + club.id" class="btn btn-primary"
                >查看詳情</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const clubs = ref([
  {
    id: 1,
    name: "數學社",
    description: "專注於數學的學術社團",
    image: "/math.jpg",
    category: "學術性",
  },
  {
    id: 2,
    name: "音樂社",
    description: "愛好音樂的藝術社團",
    image: "/music.jpg",
    category: "藝術性",
  },
  {
    id: 3,
    name: "籃球社",
    description: "熱愛籃球的體育社團",
    image: "/basketball.jpg",
    category: "體育性",
  },
  {
    id: 4,
    name: "物理社",
    description: "探索物理的學術社團",
    image: "/physics.jpg",
    category: "學術性",
  },
  {
    id: 5,
    name: "舞蹈社",
    description: "熱愛舞蹈的藝術社團",
    image: "/dance.jpg",
    category: "藝術性",
  },
  {
    id: 6,
    name: "足球社",
    description: "熱愛足球的體育社團",
    image: "/football.jpg",
    category: "體育性",
  },
]);

const categorizedClubs = ref({});

clubs.value.forEach((club) => {
  if (!categorizedClubs.value[club.category]) {
    categorizedClubs.value[club.category] = [];
  }
  categorizedClubs.value[club.category].push(club);
});
</script>

<style scoped>
.container {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
