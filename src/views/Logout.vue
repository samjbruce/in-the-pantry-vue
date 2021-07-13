<template>
  <div class="logout"></div>
</template>

<script>
import axios from "axios";

export default {
  created: function () {
    if (confirm("Are you sure you would like to logout?")) {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwt");
      this.$router.push("/");
    } else {
      this.$router.go(-1);
    }
  },
};
</script>
