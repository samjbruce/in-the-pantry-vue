<template>
  <div class="recipes-show">
    <button v-on:click="previousScreen()">Back</button>
    <h1>Recipe Show</h1>
    <h3>{{ recipe.title }}</h3>
    <img :src="recipe.image" alt="" />
    <p>Prep Time: {{ recipe.prep_time }} minutes</p>
    <p>Servings: {{ recipe.servings }}</p>
    <h3>Ingredients:</h3>
    <div v-for="ingredient in recipe.ingredients" v-bind:key="ingredient.id">
      <p>{{ ingredient }}</p>
    </div>
    <h3>Instructions:</h3>
    <div v-for="instruction in recipe.instructions" v-bind:key="instruction.id">
      <p>{{ instruction }}</p>
    </div>
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
