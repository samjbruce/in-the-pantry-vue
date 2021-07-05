<template>
  <div class="recipes-show">
    <h1>Recipe Show</h1>
    <h3>{{ recipe.title }}</h3>
    <img :src="recipe.image" alt="" />
    <p>Prep Time: {{ recipe.prep_time }} minutes</p>
    <p>Servings: {{ recipe.servings }}</p>
    <p>{{ recipe.recipe_id }}</p>
    <h3>Ingredients:</h3>
    <div v-for="ingredient in recipe.ingredients" v-bind:key="ingredient.id">
      <p>{{ ingredient }}</p>
    </div>
    <h3>Instructions:</h3>
    <div v-for="instruction in recipe.instructions" v-bind:key="instruction.id">
      <p>{{ instruction }}</p>
    </div>
    <br /><br />
    <button v-on:click="addToFavorites()">Add to Recipe Box</button>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      recipe: {},
      newFavoriteParams: {},
    };
  },
  created: function () {
    axios.get(`/recipes/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.recipe = response.data;
    });
  },
  methods: {
    addToFavorites: function () {
      axios.post("/favorites").then((response) => {
        console.log(response.data);
      });
    },
  },
};
</script>
