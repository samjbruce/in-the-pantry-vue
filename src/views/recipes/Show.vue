<template>
  <div class="recipes-show">
    <div id="main">
      <div class="container">
        <div class="recipe-content">
          <div class="row">
            <div class="col">
              <div class="recipe-lvl">
                <button v-on:click="previousScreen()" class="btn btn-primary">
                  Back
                </button>
                <br /><br />
                <span>TIME : {{ recipe.prep_time }} minutes</span>
              </div>
              <!-- end recipe level -->
              <div class="recipe-head">
                <h1 class="recipe-title">{{ recipe.title }}</h1>
                <div class="recipe-auth">
                  <span
                    >Posted by
                    <a :href="recipe.source_url" target="_blank">{{
                      recipe.source
                    }}</a></span
                  >
                </div>
                <!-- recipe author -->
                <div class="recipe-finger">
                  <div class="box-sharing">
                    <span v-if="recipe.recipe_id == favoritedRecipeId"> </span>
                    <span v-else>
                      <a v-on:click="favoriteNew()"
                        ><i class="fas fa-bookmark"></i
                      ></a>
                    </span>
                  </div>
                </div>
                <!-- end recipe finger -->
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
                  <span v-html="recipe.summary"></span>
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
              <ol>
                <li
                  v-for="instruction in recipe.instructions"
                  v-bind:key="instruction.id"
                >
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
    <div class="related-recipe">
      <div class="container">
        <h3>RELATED RECIPES</h3>
        <div class="row">
          <div
            class="col-6 col-md-3"
            v-for="similarRecipe in similarRecipes"
            v-bind:key="similarRecipe.id"
          >
            <div class="recipe-desc">
              <h2 class="recipe-title">
                <a :href="`/recipes/${similarRecipe.id}`">{{
                  similarRecipe.title
                }}</a>
              </h2>
              <span
                ><i class="fas fa-clock"></i>&nbsp;{{
                  similarRecipe.readyInMinutes
                }}
                minutes</span
              >
            </div>
            <!-- end recipe-desc -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
    <!-- related recipe -->
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
