<template>
  <div id="app">
    <header id="masthead" class="site-header navbar-fixed-top">
      <div class="header-navigation">
        <div class="container-fluid">
          <div class="row">
            <div class="col col-md-2">
              <div class="site-branding navbar-brand">
                <router-link to="/ingredients"
                  ><img src="/images/BlackLogo.png"
                /></router-link>
              </div>
              <!-- end logo -->
            </div>
            <!-- end col-md-3 -->

            <div class="col-12 col-md-8">
              <nav class="site-navigation navbar navbar-expand-lg navbar-light">
                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div
                  class="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul class="navbar-nav">
                    <li class="nav-item active" v-if="isLoggedIn()">
                      <router-link to="/ingredients" class="nav-link"
                        >Ingredients
                        <span class="sr-only">(current)</span></router-link
                      >
                    </li>

                    <li class="nav-item active" v-if="isLoggedIn()">
                      <router-link to="/favorites" class="nav-link"
                        >Recipe Box
                        <span class="sr-only">(current)</span></router-link
                      >
                    </li>
                    <li class="nav-item active" v-if="isLoggedIn()">
                      <router-link to="/shopping-list" class="nav-link"
                        >Grocery List
                        <span class="sr-only">(current)</span></router-link
                      >
                    </li>

                    <li class="nav-item dropdown" v-if="isLoggedIn()">
                      <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown1"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        >Profile</a
                      >
                      <div
                        class="dropdown-menu"
                        aria-labelledby="navbarDropdown1"
                      >
                        <router-link
                          class="dropdown-item"
                          :to="`/users/${getUserId()}`"
                          >Update Account</router-link
                        >
                        <router-link class="dropdown-item" to="/logout"
                          >Logout</router-link
                        >
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- end navbar-collapse -->
              </nav>
              <!-- end site-navigation -->
            </div>
            <!-- end col-md-6 -->

            <div class="col-md-2">
              <nav class="social-navigation">
                <div class="social-container">
                  <ul class="social-menu">
                    <li>
                      <a href="#"><i class="fab fa-facebook-square"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fab fa-instagram"></i></a>
                    </li>
                  </ul>
                </div>
                <!-- end social-container -->
              </nav>
            </div>
            <!-- end col-md-3 -->
          </div>
          <!-- end row -->
        </div>
        <!-- end container-fluid -->
      </div>
      <!-- end header-navigation -->
    </header>
    <!-- end #masthead -->
    <router-view />
  </div>
</template>

<style></style>

<script>
export default {
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
