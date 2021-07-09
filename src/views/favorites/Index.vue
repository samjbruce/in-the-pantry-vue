<template>
  <div class="favorites-index">
    <h2>Your Recipe Box</h2>
    <div v-for="favorite in favorites" v-bind:key="favorite.id">
      <h4>{{ favorite.recipe.title }}</h4>
      <p>Prep Time: {{ favorite.recipe.prep_time_minutes }}</p>
      <img :src="favorite.recipe.image_url" alt="" /><br /><br />
      <button v-on:click="deleteFavorite(favorite)">Delete Favorite</button
      ><br /><br />
      <button v-on:click="recipeShow(favorite)">More Info</button>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      favorites: [],
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
      this.$router.push(`/recipes/${favorite.recipe.recipe_id}`);
      localStorage.setItem("recipe_id", favorite.recipe.recipe_id);
    },
  },
};
</script>
