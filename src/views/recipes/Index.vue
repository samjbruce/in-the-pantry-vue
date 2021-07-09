<template>
  <div class="recipes-index">
    <h2>Save Some Recipes!</h2>
    <p>Ingredients You're Searching for Recipes With:</p>
    <p>{{ $route.query.query.split(",") }}</p>
    <div v-for="recipe in recipes.recipes" v-bind:key="recipe.id">
      <h4>{{ recipe.title }}</h4>
      <img :src="recipe.image_url" alt="" />
      <p>Used Ingredients:</p>
      <div
        v-for="ingredient in recipe.used_ingredients"
        v-bind:key="ingredient.id"
      >
        <p>{{ ingredient }}</p>
      </div>
      <br />
      <button v-on:click="recipesShow(recipe)">More Info</button>
      <br /><br />
      <button v-on:click="favoriteNew(recipe)">Bookmark</button>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipes: [],
      ingredients: [],
      newFavoriteParams: {},
    };
  },
  created: function () {
    var queryStringIngredients = this.$route.query.query;
    console.log("recipesIndex", queryStringIngredients);
    axios.get(`/recipes?query=${queryStringIngredients}`).then((response) => {
      console.log(response.data);
      this.recipes = response.data;
    });
  },
  methods: {
    recipesShow: function (recipe) {
      this.$router.push(`/recipes/${recipe.recipe_id}`);
    },
    favoriteNew: function (recipe) {
      this.newFavoriteParams.spoonacular_api_id = recipe.recipe_id;
      axios.post("/favorites", this.newFavoriteParams).then((response) => {
        console.log(response.data);
        this.$router.push("/favorites");
      });
    },
  },
};
</script>
