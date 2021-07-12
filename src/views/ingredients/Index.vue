<template>
  <div class="ingredients-index">
    <div class="head-title">
      <div class="container">
        <div id="search-2" class="widget widget_search">
          <div class="widget-title-outer">
            <h3 class="page-title">Add Ingredient</h3>
          </div>
          <div class="searchform">
            <form v-on:submit.prevent="createIngredient()">
              <input
                v-model="newIngredientParams.name"
                type="text"
                class="txt"
                name="s"
                placeholder="Type Ingredient Name"
              />
              <ul>
                <li v-for="error in errors" v-bind:key="error">
                  {{ error }}
                </li>
              </ul>
              <input type="submit" value="submit" class="btn btn-sm" />
            </form>
          </div>
          <!-- end searchform -->
        </div>
        <!-- end search widget -->
      </div>
      <!-- end container -->
    </div>
    <!-- end head-title -->
    <div id="main">
      <router-link
        class="col-6"
        :to="`/recipes?query=${queryStringIngredients}`"
        >Cook With These</router-link
      >
      <div class="container">
        <div class="recipe-index card-columns">
          <div class="card">
            <div class="index-box">
              <div class="index-head">
                <h3>All</h3>
              </div>
              <div class="index-list">
                <ul>
                  <li
                    v-for="ingredient in ingredients"
                    v-bind:key="ingredient.id"
                  >
                    <p>
                      {{ ingredient.name }} |<label> Have: </label>
                      <input
                        type="checkbox"
                        v-model="ingredient.have"
                        v-on:click="updateIngredient(ingredient)"
                        id=""
                      />
                      <label> | Cook With:</label>
                      <input
                        type="checkbox"
                        v-on:click="updateQueryString(ingredient)"
                        v-model="ingredient.cookWith"
                      />
                      |
                      <button
                        v-on:click="deleteIngredient(ingredient)"
                        class="fas fa-trash"
                      ></button>
                    </p>
                  </li>
                </ul>
              </div>
              <!-- end index-list -->
            </div>
            <!-- end index-box -->
          </div>
          <!-- end col -->
        </div>
        <!-- end card colum -->
      </div>
      <!-- end container -->
    </div>
    <!-- end main -->
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
