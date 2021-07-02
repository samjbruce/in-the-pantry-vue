<template>
  <div class="ingredients-index">
    <h2>Your Current Ingredients</h2>
    <div v-for="ingredient in ingredients" v-bind:key="ingredient.id">
      <p>Name: {{ ingredient.name }}</p>
      <p>Have: {{ ingredient.have }}</p>
      <form v-on:submit.prevent="updateIngredient(ingredient)">
        <button v-on:click="updateIngredient(ingredient)">Update Have</button
        ><br /><br />
      </form>
      <button v-on:click="deleteIngredient(ingredient)">
        Delete Ingredient
      </button>
    </div>
    <h3>Add Some Ingredients To Your Pantry!</h3>
    <form v-on:submit.prevent="createIngredient()">
      New Ingredient:
      <input type="text" v-model="newIngredientParams.name" /><br /><br />
      Do you currently have it?
      <input type="radio" id="true" name="have" />
      <label for="true">Yes</label>
      <input type="radio" id="false" name="have" />
      <label for="false">No</label><br /><br />
      <input type="submit" value="Submit" class="btn btn-primary" />
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      ingredients: [],
      newIngredientParams: {},
    };
  },
  created: function () {
    axios.get("/ingredients").then((response) => {
      console.log(response.data);
      this.ingredients = response.data;
    });
  },
  methods: {
    updateIngredient: function (ingredient) {
      axios
        .patch(`/ingredients/${ingredient.id}`, ingredient)
        .then((response) => {
          console.log(response.data);
        });
    },
    createIngredient: function () {
      axios.post("/ingredients", this.newIngredientParams).then((response) => {
        console.log(response.data);
      });
    },
    deleteIngredient: function (ingredient) {
      axios
        .delete(`ingredients/${ingredient.id}`, ingredient)
        .then((response) => {
          console.log(response.data);
        });
    },
  },
};
</script>
