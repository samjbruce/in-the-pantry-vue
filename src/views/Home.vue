<template>
  <div class="home">
    <h1>In the Pantry</h1>
    <p>
      A website for home cooks where you can save ingredients based off of what
      you currently have on hand in order to find and save recipes and make
      grocery shopping lists.
    </p>
    <h4>Login or Signup to get started!</h4>
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
