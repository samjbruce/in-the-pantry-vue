<template>
  <div class="favorites-index">
    <div class="head-title" style="padding: 40px">
      <div class="container">
        <h2 class="page-title">Recipe Box</h2>
      </div>
      <!-- end container -->
    </div>
    <!-- end head-title -->
    <div id="main">
      <div class="container">
        <div id="primary" class="content-area fullwidth">
          <div id="content" class="site-content">
            <div class="row">
              <div
                class="col-6 col-md-3"
                v-for="favorite in favorites"
                v-bind:key="favorite.id"
              >
                <div class="recipe-thumb">
                  <img :src="favorite.recipe.image_url" alt="Recipe Image" />
                  <a v-on:click="deleteFavorite(favorite)" class="bookmarker"
                    ><i class="fas fa-trash"></i
                  ></a>
                  <a
                    :href="`/recipes/${favorite.recipe.recipe_id}`"
                    v-on:click="recipeShow(favorite)"
                    class="view-recipe"
                    >VIEW RECIPE</a
                  >
                </div>
                <div class="recipe-desc">
                  <h2 class="recipe-title">
                    <a
                      :href="`/recipes/${favorite.recipe.recipe_id}`"
                      v-on:click="recipeShow(favorite)"
                      >{{ favorite.recipe.title }}</a
                    >
                  </h2>
                  <span
                    ><i class="fas fa-clock"></i>&nbsp;{{
                      favorite.recipe.prep_time
                    }}
                  </span>
                </div>
                <!-- end recipe-desc -->
              </div>
              <!-- end col -->
            </div>
            <!-- end row -->
          </div>
          <!-- end content -->
        </div>
        <!-- end primary -->
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
      favorites: [],
      preptime: [],
    };
  },
  created: function () {
    axios.get("/favorites").then((response) => {
      console.log(response.data);
      this.favorites = response.data;
    });
  },
  methods: {
    deleteFavorite: function (favorite) {
      if (
        confirm(
          "Are you sure you would like to remove this recipe from favorites?"
        )
      )
        axios.delete(`favorites/${favorite.id}`, favorite).then((response) => {
          console.log(response.data);
          var index = this.favorites.indexOf(favorite);
          this.favorites.splice(index, 1);
        });
    },
    recipeShow: function (favorite) {
      // this.$router.push(`/recipes/${favorite.recipe.recipe_id}`);
      localStorage.setItem("recipe_id", favorite.recipe.recipe_id);
    },
  },
};
</script>
