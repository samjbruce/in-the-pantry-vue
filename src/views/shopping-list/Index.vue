<template>
  <div class="shopping-list-index">
    <h2>Your Grocery Shopping List</h2>
    <h4>Name:</h4>
    <div v-for="ingredient in ingredients" v-bind:key="ingredient.id">
      <p>{{ ingredient.name }}</p>
      <br />
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      ingredients: [],
      errors: [],
      shoppingIngredients: [],
      tempIngredients: [],
    };
  },
  created: function () {
    axios.get("/ingredients").then((response) => {
      this.tempIngredients = response.data;
      this.tempIngredients.forEach((ingredient) => {
        if (ingredient.have == false) {
          this.shoppingIngredients.push(ingredient);
        }
      }),
        console.log(this.shoppingIngredients);
      this.ingredients = this.shoppingIngredients;
    });
  },
  methods: {
    shoppingListIngredients: function () {
      this.ingredients.forEach((ingredient) => {
        if (ingredient.have == false) {
          this.shoppingIngredients.push(ingredient);
        }
      }),
        console.log(this.shoppingIngredients);
    },
    deleteIngredient: function (ingredient) {
      axios
        .delete(`ingredients/${ingredient.id}`, ingredient)
        .then((response) => {
          console.log(response.data);
          this.ingredients = response.data;
        });
    },
  },
};
</script>
