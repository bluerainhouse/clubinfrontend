import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import GraphExampleView from "@/views/GraphExampleView.vue";
import GraphView from "@/views/GraphView.vue";
import RecordView from "@/views/RecordView.vue";
import RecordDetailView from "@/views/RecordDetailView.vue";
import LoginPage from "@/components/LoginPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import FullCalendar from "@/components/FullCalendar.vue";
import ClubHome from "@/views/ClubHome.vue";
// lazy-loaded
const ProfilePage = () => import("@/components/ProfilePage.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/club",
    name: "club",
    component: ClubHome,
  },
  {
    path: "/calendar",
    name: "calendar",
    component: FullCalendar,
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
