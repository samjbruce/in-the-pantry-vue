<template>
  <div class="home">
    <div id="page" class="hfeed site">
      <!-- start page wrapper -->

      <div class="head-title">
        <div class="container">
          <h2 class="page-title">Login / Register</h2>
        </div>
        <!-- end container -->
      </div>
      <!-- end head-title -->

      <div id="main">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="acc-box equal">
                <h2>Login</h2>
                <p>
                  <em>Welcome back. Log in using your e-mail and password.</em>
                </p>
                <form v-on:submit.prevent="submitLogin()">
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
                    <label for="InputEmailAcc1">Email address *</label>
                    <input
                      type="email"
                      class="form-control"
                      id="InputEmailAcc1"
                      placeholder="Enter email"
                      v-model="email"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password *</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      v-model="password"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">Login</button>
                </form>
              </div>
              <!-- end acc-box -->
            </div>
            <!-- end col -->

            <div class="col-12 col-md-6">
              <div class="acc-box equal">
                <h2>Register</h2>
                <p><em>If you don't have account yet.</em></p>
                <form v-on:submit.prevent="submitSignup()">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      placeholder="Enter name"
                      v-model="newUserParams.name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="InputEmailAcc">Email address </label>
                    <input
                      type="email"
                      class="form-control"
                      id="InputEmailAcc"
                      placeholder="you@email.com"
                      v-model="newUserParams.email"
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Enter password"
                      v-model="newUserParams.password"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Register
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
    <!-- end #page hfeed site -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      email: "",
      password: "",
      newUserParams: {},
      errors: [],
    };
  },
  created: function () {},
  methods: {
    loginPush: function () {
      this.$router.push("/login");
    },
    signupPush: function () {
      this.$router.push("/signup");
    },
    submitLogin: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/ingredients");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
    submitSignup: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.data);
        });
    },
  },
};
</script>
