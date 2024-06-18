import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginPage from "@/components/LoginPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import FullCalendar from "@/components/FullCalendar.vue";
import Announcement from "@/components/AnnouncementDetail.vue";
import AnnouncementForm from "@/components/AnnouncementForm.vue";
import AnnouncementList from "@/views/AnnouncementListView.vue";
import Activity from "@/components/ActivityDetail.vue";
import ActivityForm from "@/components/ActivityForm.vue";
import ActivityList from "@/views/ActivityList.vue";
import Club from "@/components/ClubInfo.vue";
import ClubList from "@/views/ClubList.vue";
// lazy-loaded
const ProfilePage = () => import("@/components/ProfilePage.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/club/:clubId",
    name: "club",
    component: Club,
  },
  {
    path: "/clubs",
    name: "clubs",
    component: ClubList,
  },
  {
    path: "/activity/:actId",
    name: "activity",
    component: Activity,
  },
  {
    path: "/newActivity",
    name: "newActivity",
    component: ActivityForm,
  },
  {
    path: "/activities",
    name: "activities",
    component: ActivityList,
  },
  {
    path: "/announcement/:anoId",
    name: "announcement",
    component: Announcement,
  },
  {
    path: "/newAnnouncement",
    name: "newAnnouncement",
    component: AnnouncementForm,
  },
  {
    path: "/announcements",
    name: "announcements",
    component: AnnouncementList,
  },
  {
    path: "/calendar",
    name: "calendar",
    component: FullCalendar,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/register",
    component: RegisterPage,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: ProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
