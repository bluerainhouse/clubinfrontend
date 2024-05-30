<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        contentHeight: 430,
        events: [
          {
            title: "boyyyy",
            start: "2024-05-29",
            end: "2024-05-31",
            backgroundColor: "#ff0000",
            borderColor: "#ff0000",
            url: "http://www.google.com",
          },
          { title: "event 2", date: "2024-05-31" },
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
  <FullCalendar :options="calendarOptions" />
</template>
