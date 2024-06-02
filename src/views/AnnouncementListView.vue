<!-- src/components/AnnouncementList.vue -->
<template>
  <div class="container my-5">
    <!-- 篩選按鈕 -->
    <h2>Announcements</h2>
    <input type="text" v-model="searchClub" placeholder="Club Name" />
    <input type="text" v-model="searchTitle" placeholder="Title" />
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary" @click="filterAnnouncements">
        Filter
      </button>
    </div>

    <!-- 公告列表 -->
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col" class="col-date">Date</th>
            <th scope="col" class="col-title">Title</th>
            <th scope="col" class="col-club">Club Name</th>
            <th v-if="!isLoggedIn" scope="col" class="col-bookmarked">
              Bookmarked
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(announcement, index) in filteredItems" :key="index">
            <td>{{ announcement.date }}</td>
            <td>{{ announcement.title }}</td>
            <td>{{ announcement.clubName }}</td>
            <td v-if="!isLoggedIn" class="text-center">
              <span @click="toggleBookmark(index)" class="cursor-pointer">
                <i
                  :class="
                    announcement.isBookmarked ? 'bi bi-star-fill' : 'bi bi-star'
                  "
                ></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
let searchClub = "";
let searchTitle = "";
// 公告數據
const announcements = ref([
  {
    date: "2023-05-30",
    title: "社團活動通知",
    clubName: "學生會",
    isBookmarked: true,
  },
  {
    date: "2023-05-29",
    title: "新成員招募",
    clubName: "音樂社",
    isBookmarked: false,
  },
  {
    date: "2023-05-28",
    title: "校園清掃活動",
    clubName: "環保社",
    isBookmarked: true,
  },
  // 添加更多公告
]);

// 模擬保存到資料庫的功能
const saveToDatabase = (index) => {
  // 在這裡放置你的資料庫保存邏輯，例如 API 調用
  console.log(
    `儲存公告 ${index} 的收藏狀態:`,
    announcements.value[index].isBookmarked
  );
};

// 切換收藏狀態
const toggleBookmark = (index) => {
  announcements.value[index].isBookmarked =
    !announcements.value[index].isBookmarked;
  saveToDatabase(index);
};

// 篩選公告方法
const filterAnnouncements = () => {
  // 篩選邏輯，例如顯示最近的公告或特定社團的公告
  console.log("篩選公告");
};

const isLoggedIn = computed(() => !!store.state.auth.user);

const filteredItems = computed(() => {
  return announcements.value.filter((announcement) => {
    // 根据输入的社团名称和标题进行过滤
    return (
      announcement.clubName.toLowerCase().includes(searchClub.toLowerCase()) &&
      announcement.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
  });
});
</script>

<style scoped>
.my-5 {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.table-responsive {
  overflow-x: auto;
}
.col-date {
  width: 25%;
}
.col-title {
  width: 50%;
}
.col-club {
  width: 15%;
}
.col-bookmarked {
  width: 10%;
}
.text-center {
  text-align: center;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
