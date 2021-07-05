<template>
  <div class="ingredients-index">
    <h2>Add Some Ingredients To Your Pantry!</h2>
    <form v-on:submit.prevent="createIngredient()">
      New Ingredient:
      <input type="text" v-model="newIngredientParams.name" /><br /><br />
      <ul>
        <li v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      Do you currently have it?
      <input
        type="radio"
        id="true"
        name="have"
        v-model="newIngredientParams.have"
        v-bind:value="true"
      />
      <label for="true">Yes</label>
      <input
        type="radio"
        id="false"
        name="have"
        v-model="newIngredientParams.have"
        v-bind:value="false"
      />
      <label for="false">No</label><br /><br />
      <input type="submit" value="Submit" class="btn btn-primary" />
    </form>
    <h3>Your Current Ingredients</h3>
    <div>
      <div v-for="ingredient in ingredients" v-bind:key="ingredient.id">
        <p>Name: {{ ingredient.name }}</p>
        <p>Have:</p>
        <form v-on:submit.prevent="updateIngredient(ingredient)">
          <input
            type="radio"
            id="updateHaveTrue"
            name="updateHave"
            v-model="ingredient.have"
            v-bind:value="true"
          />
          <label for="updateHaveTrue">Yes</label>
          <input
            type="radio"
            id="updateHaveFalse"
            name="updateHave"
            v-model="ingredient.have"
            v-bind:value="false"
          />
          <label for="updateHaveFalse">No</label><br /><br />
          <input
            type="radio"
            id="updateHaveTrue"
            name="updateHave"
            v-model="ingredient.have"
            v-bind:value="true"
          />
          <label for="updateHaveTrue">Yes</label>
          <input
            type="radio"
            id="updateHaveFalse"
            name="updateHave"
            v-model="ingredient.have"
            v-bind:value="false"
          />
          <label for="updateHaveFalse">No</label><br /><br />
          <input type="submit" value="Submit" class="btn btn-primary" />
        </form>
        Search for recipes with this ingredient:
        <button v-on:click="deleteIngredient(ingredient)">
          Delete Ingredient
        </button>
      </div>
      <button v-on:click="updateIngredient()">Cook With</button>
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
      newIngredientParams: {},
      cookWith: [],
    };
  },
  created: function () {
    axios.get("/ingredients").then((response) => {
      this.ingredients = response.data;
      console.log(response.data);
    });
  },
  methods: {
    updateIngredient: function (ingredient) {
      axios
        .patch(`/ingredients/${ingredient.id}`, ingredient)
        .then((response) => {
          this.ingredients = response.data;
          console.log(response.data);
        });
    },
    createIngredient: function () {
      axios
        .post("/ingredients", this.newIngredientParams)
        .then((response) => {
          this.ingredients = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    deleteIngredient: function (ingredient) {
      axios
        .delete(`ingredients/${ingredient.id}`, ingredient)
        .then((response) => {
          console.log(response.data);
          this.ingredients = response.data;
        });
    },
    addToCookWith: function () {
      console.log(this.cookWith);
    },
  },
};
</script>
