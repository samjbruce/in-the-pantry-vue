<template>
  <div class="recipes-show">
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
    <button v-on:click="favoriteNew()">Add to Favorites</button><br /><br />
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
    favoriteNew: function () {
      this.newFavoriteParams.spoonacular_api_id = this.$route.params.id;
      axios.post("/favorites", this.newFavoriteParams).then((response) => {
        console.log(response.data);
        this.$router.push("/favorites");
      });
    },
  },
};
</script>
