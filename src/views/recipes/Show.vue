<template>
  <div class="recipes-show">
    <div id="main">
      <div class="container">
        <div class="recipe-content">
          <div class="row">
            <div class="col">
              <div class="recipe-lvl">
                <span>TIME : {{ recipe.prep_time }} minutes</span>
              </div>
              <!-- end recipe level -->
              <div class="recipe-head">
                <h1 class="recipe-title">{{ recipe.title }}</h1>
                <div class="recipe-auth">
                  <span>Posted by <a href="#">Dina Makulatuwa</a></span>
                </div>
                <!-- recipe author -->
              </div>
            </div>
            <!-- end col -->
          </div>
          <!-- end row -->

          <div class="row">
            <div class="col-md-6">
              <figure class="recipe-pict">
                <img :src="recipe.image" alt="IMG 01" />
              </figure>
            </div>
            <!-- end col -->
            <div class="col-md-6">
              <div class="detail-desc">
                <p><strong>DESCRIPTION</strong></p>
                <p>
                  Maecenas eu maximus turpis. Aliquam eget libero vitae elit
                  tempor mollis. Curabitur sed mi et quam varius
                  <em>rhoncus velex</em>. Mauris facilisis consequat libero non
                  varius. Suspendisse nec quam tincidunt, imperdiet risus sed,
                  finibus erat. Curabitur egestas nulla non dolor
                  <a href="#">gravida</a>, maximus dictum massa lacinia. Cras
                  porttitor, diam ac lacinia scelerisque, arcu arcu aliquet
                  quam, non dignissim tortor turpis at mauris. Ut eget euismod
                  nulla.
                </p>

                <p>
                  Donec quis finibus nibh. Donec mattis id orci sed dapibus.
                  Praesent augue odio, imperdiet sed mollis in, vehicula quis
                  nulla. Ut eu vulputate ligula. Vivamus volutpat lectus dolor,
                  sed congue elit rhoncus pharetra. Praesent non posuere felis.
                  Ut aliquam luctus odio, ac commodo felis consectetur nec.
                  Integer vehicula sit amet erat ut pharetra. Mauris ornare
                  ligula dui, id placerat lacus iaculis sed.
                </p>
              </div>
              <!-- recipe desc -->
            </div>
            <!-- end col -->
          </div>
          <!-- end row -->

          <div class="space-section"></div>

          <div class="row">
            <div class="ingredient col-md-4">
              <p><strong>INGREDIENTS</strong></p>
              <ul
                v-for="ingredient in recipe.ingredients"
                v-bind:key="ingredient.id"
              >
                <li>{{ ingredient }}</li>
              </ul>
            </div>
            <!-- end col -->
            <div class="direction col-md-8">
              <p><strong>DIRECTIONS</strong></p>
              <ol
                v-for="instruction in recipe.instructions"
                v-bind:key="instruction.id"
              >
                <li>
                  <p>{{ instruction }}</p>
                </li>
              </ol>
            </div>
            <!-- end col -->
          </div>
          <!-- end row -->

          <div class="space-section"></div>

          <!-- end row -->
        </div>
        <!-- end recipe content -->
      </div>
      <!-- end container -->
    </div>
    <!-- end main -->
    <button v-on:click="previousScreen()">Back</button>
    <br /><br />
    <span v-if="recipe.recipe_id == favoritedRecipeId"> </span>
    <span v-else>
      <button v-on:click="favoriteNew()">Add to Favorites</button>
    </span>
    <br /><br />
    <div v-for="similarRecipe in similarRecipes" v-bind:key="similarRecipe.id">
      <p>{{ similarRecipe.title }}</p>
      <p>Prep Time: {{ similarRecipe.readyInMinutes }} minutes</p>
      <a :href="`/recipes/${similarRecipe.id}`">More Info</a>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      recipe: {},
      favoritedRecipeId: "",
      newFavoriteParams: {},
      similarRecipes: {},
    };
  },
  created: function () {
    axios.get(`/recipes/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.recipe = response.data.formatted_recipe;
      this.similarRecipes = response.data.similar_recipes;
      this.favoritedRecipeId = localStorage.getItem("recipe_id");
    });
  },
  methods: {
    favoriteNew: function () {
      this.newFavoriteParams.spoonacular_api_id = this.$route.params.id;
      axios.post("/favorites", this.newFavoriteParams).then((response) => {
        console.log(response.data);
        this.$router.push("/favorites");
      });
    },
    favorited: function () {
      if (this.favoritedRecipeId == this.recipe.recipe_id) {
        console.log("True");
      }
      console.log(this.favoritedRecipeId);
      console.log(this.recipe.recipe_id);
    },
    previousScreen: function () {
      this.$router.go(-1);
    },
  },
};
</script>
