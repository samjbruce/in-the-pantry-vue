<template>
  <div class="home">
    <h1>In the Pantry</h1>
    <p>Login or Signup to get started!</p>
    <button v-on:click="loginPush()">Login</button><br /><br />
    <button v-on:click="signupPush()">Signup</button>
  </div>
</template>

<style></style>

<script>
// import axios from "axios";
export default {
  data: function () {
    return {};
  },
  created: function () {},
  methods: {
    loginPush: function () {
      this.$router.push("/login");
    },
    signupPush: function () {
      this.$router.push("/signup");
    },
  },
};
</script>
