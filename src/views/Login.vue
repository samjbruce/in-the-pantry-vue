<template>
  <div class="login">
    <div id="page" class="hfeed site">
      <!-- start page wrapper -->

      <div class="head-title">
        <div class="container">
          <h2 class="page-title">Login</h2>
        </div>
        <!-- end container -->
      </div>
      <!-- end head-title -->

      <div id="main">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md">
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
          </div>
        </div>
        <!-- end container -->
      </div>
      <!-- end main -->

      <div class="bottom">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="widget widget-about">
                <div class="widget-inner">
                  <h3 class="widget-title">About Taplak</h3>
                  <p>
                    Investigationes demonstraverunt lectores legere me lius quod
                    ii legunt saepius. Claritas est etiam processus dynamicus,
                    qui sequitur mutationem consuetudium lectorum. Mirum est
                    notare quam littera gothica, quam nunc putamus parum claram,
                    anteposuerit litterarum formas humanitatis per seacula
                    quarta decima et quinta decima.
                  </p>
                </div>
                <!-- end widget-inner -->
              </div>
              <!-- end widget -->
            </div>
            <!-- end col -->
            <div class="col-md-6">
              <div class="widget widget-subscribe">
                <div class="widget-inner">
                  <h3 class="widget-title">Stay Updated</h3>
                  <span
                    >Register your email address to get promos, product updates
                    and other info.</span
                  >
                  <div class="subscribe-form">
                    <input
                      type="email"
                      name="EMAIL"
                      placeholder="Your email address"
                      required=""
                    />
                    <input type="submit" value="Subscribe" />
                  </div>
                  <!-- end subscribe-form -->
                </div>
                <!-- end widget-inner -->
              </div>
              <!-- end widget -->
            </div>
            <!-- end col -->
          </div>
          <!-- end row -->
          <div class="row no-gutters">
            <div class="col-md-6">
              <div class="copy">
                <p>
                  &copy; 2020 Taplak Web Template. Made with
                  <i class="fas fa-heart"></i> by Honeypress
                </p>
              </div>
              <!-- end copy -->
            </div>
            <!-- end col -->
            <div class="col-md-6">
              <ul class="bottom-nav">
                <li><a href="#">Home</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms and Conditions</a></li>
              </ul>
            </div>
            <!-- end col -->
          </div>
          <!-- end row -->
        </div>
        <!-- end container -->
      </div>
      <!-- end bottom -->
    </div>
    <!-- end #page hfeed site -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
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
  },
};
</script>
