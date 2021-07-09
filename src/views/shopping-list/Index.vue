<template>
  <div class="shopping-list-index">
    <h2>Your Grocery Shopping List</h2>
    <div v-for="ingredient in ingredients" v-bind:key="ingredient.id">
      <h4>{{ ingredient.name }}</h4>
      <label>Purchased:</label>
      <input
        type="checkbox"
        v-model="ingredient.have"
        v-on:click="updateIngredient(ingredient)"
        id=""
      />
      <!-- <form v-on:submit.prevent="updateIngredient(ingredient)">
        <input
          type="radio"
          id="updateHaveTrue"
          name="updateHave"
          v-model="ingredient.have"
          value="true"
        />
        <label for="updateHaveTrue">Yes</label>
        <input
          type="radio"
          id="updateHaveFalse"
          name="updateHave"
          v-model="ingredient.have"
          value="false"
        />
        <label for="updateHaveFalse">No</label><br /><br />
        <input type="submit" value="Purchased" class="btn btn-primary" />
      </form> -->
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
      ingredient.have = !ingredient.have;
      console.log(ingredient.have);
      axios
        .patch(`/ingredients/${ingredient.id}`, ingredient)
        .then((response) => {
          for (var i = 0; i < this.ingredients.length; i++) {
            if (this.ingredients[i] === ingredient) {
              this.ingredients.splice(i, 1);
            }
          }
          console.log(response.data);
        });
    },
  },
};
</script>
