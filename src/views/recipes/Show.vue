<template>
  <div class="recipes-show">
    <h1>Recipe Show</h1>
    <h3>{{ recipe.title }}</h3>
    <p>Prep Time: {{ recipe.prep_time }} minutes</p>
    <p>Servings: {{ recipe.servings }}</p>
    <p>Ingredients: {{ recipe.ingredients }}</p>
    <p>Instructions: {{ recipe.instructions }}</p>
    <img :src="recipe.image" alt="" />
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      recipe: {},
    };
  },
  created: function () {
    axios.get(`/recipes/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.recipe = response.data;
    });
  },
  methods: {},
};
</script>
