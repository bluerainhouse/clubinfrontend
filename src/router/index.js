import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import GraphExampleView from "@/views/GraphExampleView.vue";
import GraphView from "@/views/GraphView.vue";
import RecordView from "@/views/RecordView.vue";
import RecordDetailView from "@/views/RecordDetailView.vue";
import LoginPage from "@/components/LoginPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import FullCalendar from "@/components/FullCalendar.vue";
import Announcement from "@/views/AnnouncementListView.vue";
import AnnouncementDetail from "@/components/AnnouncementDetail.vue";
import AnnouncementForm from "@/views/AnnouncementForm.vue";
import ClubList from "@/views/ClubList.vue";
import ClubClass from "@/views/ClubClassView.vue";
import Events from "@/views/EventView.vue";
import ClubInfo from "@/components/ClubInfo.vue";
import ClubListView from "@/views/ClubListView.vue";
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
    component: ClubInfo,
  },
  {
    path: "/clubs",
    name: "clubs",
    component: ClubList,
  },
  {
    path: "/club-class/:actId",
    name: "clubClass",
    component: ClubClass,
  },
  {
    path: "/clubList",
    name: "clubList",
    component: ClubListView,
  },
  {
    path: "/event",
    name: "event",
    component: Events,
  },
  {
    path: "/calendar",
    name: "calendar",
    component: FullCalendar,
  },
  {
    path: "/announcement",
    name: "announcement",
    component: Announcement,
  },
  {
    path: "/announcement-detail",
    name: "announcement-detail",
    component: AnnouncementDetail,
  },
  {
    path: "/announcementEdit",
    name: "announcement-form",
    component: AnnouncementForm,
  },
  {
    path: "/graph-example",
    name: "graph-example",
    component: GraphExampleView,
  },
  {
    path: "/graph",
    name: "graph",
    component: GraphView,
  },
  {
    path: "/record",
    name: "record",
    component: RecordView,
  },
  {
    path: "/record-detail/:recordId",
    name: "record-detail",
    component: RecordDetailView,
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
