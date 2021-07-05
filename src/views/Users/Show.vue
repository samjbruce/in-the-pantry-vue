<template>
  <div class="users-show">
    <h1>User Show Page</h1>
    <h3>{{ user.name }}</h3>
    <p>Email: {{ user.email }}</p>
    <br />
    <img :src="user.image_url" />
    <div>
      <form v-on:submit.prevent="updateUser()">
        <ul>
          <li v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <h2>Update Profile</h2>
        <label>Name: </label>
        <input type="text" v-model="editUserParams.name" /><br />
        <label>Email: </label>
        <input type="text" v-model="editUserParams.email" /><br />
        <label>Image URL: </label>
        <input type="text" v-model="editUserParams.image_url" /><br />
        <input type="submit" class="btn btn-primary" value="Submit" />
      </form>
    </div>
    <br />
    <button v-on:click="destroyUser">Delete Profile</button>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      errors: [],
      editUserParams: {},
    };
  },
  created: function () {
    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
      this.editUserParams = response.data;
    });
  },
  methods: {
    updateUser: function () {
      axios
        .patch(`/users/${this.editUserParams.id}`, this.editUserParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function () {
      if (confirm("Are you sure you would like to delete your profile?")) {
        axios.delete(`/users/${this.user.id}`).then((response) => {
          console.log(response.data);
          this.$router.push("/");
        });
      }
    },
  },
};
</script>
