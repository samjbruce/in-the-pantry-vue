<template>
  <div class="shopping-list-index">
    <h2>Your Grocery Shopping List</h2>
    <div v-for="ingredient in ingredients" v-bind:key="ingredient.id">
      <h4>{{ ingredient.name }}</h4>
      <form v-on:submit.prevent="updateIngredient(ingredient)">
        <h4>Purchased:</h4>
        <input
          type="radio"
          id="updateHaveFalse"
          name="updateHave"
          v-model="ingredient.have"
          v-bind:value="false"
        />
        <label for="updateHaveFalse">Yes</label>
        <input
          type="radio"
          id="updateHaveTrue"
          name="updateHave"
          v-model="ingredient.have"
          v-bind:value="true"
        />
        <label for="updateHaveTrue">No</label><br />

        <input type="submit" value="Submit" class="btn btn-primary" />
      </form>
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
    updateIngredient: function (ingredient) {
      axios
        .patch(`/ingredients/${ingredient.id}`, ingredient)
        .then((response) => {
          console.log(response.data);
        });
    },
  },
};
</script>
