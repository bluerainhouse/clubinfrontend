<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
// import the third-party stylesheets directly from your JS
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css"; // needs additional webpack config!

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        themeSystem: "bootstrap",
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          bootstrapPlugin,
          interactionPlugin, // needed for dateClick
        ],
        bootstrapFontAwesome: {
          prev: "fa-solid fa-arrow-left",
          next: "fa-solid fa-arrow-right",
          today: "fa-solid fa-calendar-day",
        },
        headerToolbar: {
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        contentHeight: 650,
        events: [
          {
            title: "boyyyy",
            start: "2024-05-29 12:00:00",
            end: "2024-05-31",
            backgroundColor: "#ff0000",
            borderColor: "#ff0000",
            url: "/activity/2",
          },
          {
            title: "toyy",
            start: "2024-05-29 09:00:00",
            end: "2024-05-31",
            url: "/activity/1",
          },
          { title: "event 2", date: "2024-05-31", url: "/activity/3" },
        ],
      },
    };
  },
  methods: {
    handleDateClick: function (arg) {
      alert("date click! " + arg.dateStr);
    },
  },
};
</script>
<template>
  <br />
  <FullCalendar :options="calendarOptions" />
</template>
