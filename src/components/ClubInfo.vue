<!-- src/components/ClubInfo.vue -->
<template>
  <div class="container my-5">
    <!-- Hero Section -->
    <div class="jumbotron text-center bg-primary text-white">
      <img
        src="https://via.placeholder.com/150"
        alt="Club Logo"
        class="rounded-circle mb-4"
        width="120"
      />
      <h1 class="display-4">學生會社團</h1>
      <p class="lead">促進學生交流與合作，共創美好校園生活。</p>
    </div>

    <!-- 社團簡介卡片 -->
    <div class="card mb-5">
      <div class="card-header">
        <h2>關於我們</h2>
      </div>
      <div class="card-body">
        <p>
          歡迎來到學生會社團！我們的宗旨是通過各種活動和項目，促進學生之間的交流與合作，豐富校園生活。
          我們歡迎所有學生加入我們的大家庭，一起創造更多美好回憶。
        </p>
      </div>
    </div>

    <!-- 聯繫方式卡片 -->
    <div class="card mb-5">
      <div class="card-header">
        <h2>聯繫方式</h2>
      </div>
      <div class="card-body">
        <ul class="list-unstyled">
          <li><i class="bi bi-envelope"></i> Email: club@example.com</li>
          <li><i class="bi bi-telephone"></i> 電話: 123-456-7890</li>
          <li>
            <i class="bi bi-facebook"></i>
            <a
              href="https://facebook.com/club"
              target="_blank"
              rel="noopener noreferrer"
              >Facebook</a
            >
          </li>
          <li>
            <i class="bi bi-twitter"></i>
            <a
              href="https://twitter.com/club"
              target="_blank"
              rel="noopener noreferrer"
              >Twitter</a
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- 常見問題解答卡片 -->
    <div class="card mb-5">
      <div class="card-header">
        <h2>常見問題解答</h2>
      </div>
      <div class="card-body">
        <div class="accordion" id="faqAccordion">
          <div class="accordion-item" v-for="(faq, index) in faqs" :key="index">
            <h2 class="accordion-header" :id="'heading' + index">
              {{ faq.question }}
            </h2>

            <div class="accordion-body">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 常見問題數據
const faqs = ref([
  {
    question: "如何加入社團？",
    answer: "你可以通過填寫申請表格並參加我們的迎新活動來加入社團。",
  },
  {
    question: "會員有什麼福利？",
    answer: "會員可以參加我們組織的各種活動，並有機會獲得獎品和證書。",
  },
  // 添加更多的常見問題
]);
</script>

<style scoped>
.my-5 {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.bg-primary {
  background-color: #007bff !important;
}
.text-white {
  color: #fff !important;
}
.rounded-circle {
  border-radius: 50% !important;
}
</style>
