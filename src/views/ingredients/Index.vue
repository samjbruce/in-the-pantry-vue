<template>
  <div class="ingredients-index">
    <h2>Add Some Ingredients To Your Pantry!</h2>
    <form v-on:submit.prevent="createIngredient()">
      New Ingredient:
      <input type="text" v-model="newIngredientParams.name" />
      <ul>
        <li v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <input type="submit" value="Submit" class="btn btn-primary" />
    </form>
    <h3>Your Current Ingredients</h3>
    <router-link :to="`/recipes?query=${queryStringIngredients}`"
      >Cook With These</router-link
    ><br /><br />
    <div>
      <input type="text" v-model="searchTerm" placeholder="Search" />
      <div
        v-for="ingredient in filterBy(ingredients, searchTerm, 'name')"
        v-bind:key="ingredient.id"
      >
        <h4>{{ ingredient.name }}</h4>
        <label>Have:</label>
        <input
          type="checkbox"
          v-model="ingredient.have"
          v-on:click="updateIngredient(ingredient)"
          id=""
        />
        <br />
        <br />
        <label>Cook With:</label>
        <input
          type="checkbox"
          v-on:click="updateQueryString(ingredient)"
          v-model="ingredient.cookWith"
        />
        <br /><br />
        <button v-on:click="deleteIngredient(ingredient)">
          Delete Ingredient
        </button>
      </div>
      <br /><br />
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      ingredients: [],
      errors: [],
      newIngredientParams: {},
      searchTerm: "",
      queryStringIngredients: "",
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
      ingredient.have = !ingredient.have;
      console.log(ingredient.have);
      axios
        .patch(`/ingredients/${ingredient.id}`, ingredient)
        .then((response) => {
          console.log(response.data);
        });
    },
    createIngredient: function () {
      axios
        .post("/ingredients", this.newIngredientParams)
        .then((response) => {
          this.ingredients.unshift(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    deleteIngredient: function (ingredient) {
      axios
        .delete(`/ingredients/${ingredient.id}`, ingredient)
        .then((response) => {
          console.log("ingredient destroyed", response);
          var index = this.ingredients.indexOf(ingredient);
          this.ingredients.splice(index, 1);
        });
    },
    updateQueryString: function (ingredient) {
      ingredient.cookWith = !ingredient.cookWith;
      console.log(ingredient.cookWith);
      if (this.queryStringIngredients && ingredient.cookWith) {
        this.queryStringIngredients += `,${ingredient.name}`;
      } else if (ingredient.cookWith) {
        this.queryStringIngredients += ingredient.name;
      } else if (this.queryStringIngredients && !ingredient.cookWith) {
        this.queryStringIngredients = this.queryStringIngredients.replace(
          ingredient.name,
          ""
        );
        this.queryStringIngredients = this.queryStringIngredients.replace(
          ",,",
          ","
        );
      }
      console.log(this.queryStringIngredients);
    },
  },
};
</script>
