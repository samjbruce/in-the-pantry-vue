<template>
  <div class="users-show">
    <div class="head-title">
      <div class="container">
        <h2 class="page-title">Your Account</h2>
      </div>
      <!-- end container -->
    </div>
    <!-- end head-title -->
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md">
            <div class="acc-box equal">
              <h2>{{ user.name }}</h2>
              <p>
                <em>Update your account information below.</em>
              </p>
              <form v-on:submit.prevent="updateUser()">
                <ul>
                  <li
                    class="text-danger"
                    v-for="error in errors"
                    v-bind:key="error"
                  >
                    {{ error }}
                  </li>
                </ul>
                <div class="form-group">
                  <label for="Name">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="Name"
                    placeholder="Enter email"
                    v-model="editUserParams.name"
                  />
                </div>
                <div class="form-group">
                  <label for="InputEmailAcc1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="InputEmailAcc1"
                    placeholder="Enter email"
                    v-model="editUserParams.email"
                  />
                </div>
                <div style="padding-bottom: 15px">
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
                <button v-on:click="destroyUser" class="btn btn-primary">
                  Delete Profile
                </button>
              </form>
            </div>
            <!-- end acc-box -->
          </div>
          <!-- end col -->
        </div>
      </div>
      <!-- end container -->
    </div>
    <!-- end main -->
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
