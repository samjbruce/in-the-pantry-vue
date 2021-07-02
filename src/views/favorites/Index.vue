<template>
  <div class="favorites-index">
    <h2>Your Recipe Box</h2>
    <div v-for="favorite in favorites" v-bind:key="favorite.id">
      <h4>{{ favorite.recipe.title }}</h4>
      <p>Prep Time: {{ favorite.recipe.prep_time_minutes }}</p>
      <img :src="favorite.recipe.image_url" alt="" /><br /><br />
      <button v-on:click="deleteFavorite(favorite)">Delete Favorite</button>
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
      axios.delete(`favorites/${favorite.id}`, favorite).then((response) => {
        console.log(response.data);
      });
    },
  },
};
</script>
