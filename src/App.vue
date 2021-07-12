<template>
  <div id="app">
    <header id="masthead" class="site-header navbar-fixed-top">
      <div class="header-navigation">
        <div class="container-fluid">
          <div class="row">
            <div class="col col-md-2">
              <div class="site-branding navbar-brand">
                <a href="#"
                  ><img
                    src="images/logo.png"
                    alt="Food Recipe Web Template"
                    title="Taplak"
                /></a>
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
                    <li class="nav-item active">
                      <router-link to="/" class="nav-link"
                        >Home
                        <span class="sr-only">(current)</span></router-link
                      >
                    </li>
                    <li class="nav-item active" v-if="!isLoggedIn()">
                      <router-link to="/signup" class="nav-link"
                        >Signup
                        <span class="sr-only">(current)</span></router-link
                      >
                    </li>
                    <li class="nav-item active" v-if="!isLoggedIn()">
                      <router-link to="/login" class="nav-link"
                        >Login
                        <span class="sr-only">(current)</span></router-link
                      >
                    </li>
                    <li class="nav-item active" v-if="isLoggedIn()">
                      <router-link to="/ingredients" class="nav-link"
                        >Ingredients
                        <span class="sr-only">(current)</span></router-link
                      >
                    </li>
                    <li class="nav-item active" v-if="isLoggedIn()">
                      <router-link to="/recipes" class="nav-link"
                        >Find New Recipes
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
                        <router-link class="dropdown-item" to="/favorites"
                          >Recipe Box</router-link
                        >
                        <router-link class="dropdown-item" to="/shopping-list"
                          >Shopping List</router-link
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
                <div class="search-container">
                  <button type="button" class="buttonsearch" id="buttonsearch">
                    <i class="fas fa-search openclosesearch"></i
                    ><i
                      class="fas fa-times openclosesearch"
                      style="display: none"
                    ></i>
                  </button>
                </div>
                <!-- end search-container -->
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
    <div id="nav">
      <span v-if="!isLoggedIn()">
        <router-link to="/">Home |</router-link>
        <router-link to="/signup">Signup |</router-link>
        <router-link to="/login"> Login |</router-link>
      </span>
      <span v-if="isLoggedIn()">
        <router-link :to="`/users/${getUserId()}`"> My Profile |</router-link>
        <router-link to="/ingredients"> Ingredients |</router-link>
        <router-link to="/favorites"> Recipe Box |</router-link>
        <router-link to="/recipes"> Find New Recipes |</router-link>
        <router-link to="/shopping-list"> Shopping List |</router-link>
        <router-link to="/logout"> Logout |</router-link>
      </span>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

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
