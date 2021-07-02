<template>
  <div class="recipes-index">
    <h2>Your Recipe Box</h2>
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h4>{{ recipe.title }}</h4>
      <p>Prep Time: {{ recipe.prep_time_minutes }}</p>
      <img :src="recipes.image_url" alt="" /><br /><br />
      <button v-on:click="deleteRecipes(recipes)">Delete Recipes</button>
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
    };
  },
  created: function () {
    axios.get("/recipes").then((response) => {
      console.log(response.data);
      this.favorites = response.data;
    });
  },
  methods: {},
};
</script>
