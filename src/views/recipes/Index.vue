<template>
  <div class="recipes-index">
    <h2>Save Some Recipes!</h2>
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
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
    };
  },
  created: function () {
    axios.get("/recipes").then((response) => {
      console.log(response.data);
      this.recipes = response.data;
    });
  },
  methods: {
    recipesShow: function (recipe) {
      this.$router.push(`/recipes/${recipe.recipe_id}`);
    },
  },
};
</script>
