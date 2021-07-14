<template>
  <div class="ingredients-index">
    <div class="head-title" style="padding: 40px">
      <h2 class="page-title">Your Pantry Online</h2>
    </div>
    <div id="main">
      <div class="centered" style="padding-bottom: 40px">
        <h4>Add ingredients. Make a grocery shopping list. Plan your meals.</h4>
        <br />

        <a
          :href="`/recipes?query=${queryStringIngredients}`"
          class="btn btn-primary"
          style="padding: 15px"
          >Cook With Chosen Ingredients</a
        >
      </div>
      <!-- end centered -->
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="acc-box equal" style="padding: 20px">
              <h2>Add Items Currently In Your Pantry!</h2>
              <form v-on:submit.prevent="createIngredient()">
                <ul>
                  <li
                    class="text-danger"
                    v-for="error in errors"
                    v-bind:key="error"
                  >
                    {{ error }}
                  </li>
                </ul>
                <div class="form-group">
                  <input
                    type="text"
                    id="textfield"
                    class="form-control"
                    autocomplete="off"
                    placeholder="Enter one ingredient"
                    v-model="newIngredientParams.name"
                  />
                </div>
                <button type="submit" class="btn btn-primary">Add</button>
              </form>
            </div>
            <!-- end acc-box -->
          </div>
          <!-- end col -->
        </div>
      </div>
      <!-- end container -->
      <div class="container">
        <div class="recipe-index card-columns">
          <div class="card">
            <div class="index-box">
              <div class="index-head"></div>
              <div class="index-list">
                <ul>
                  <li
                    v-for="ingredient in ingredients.slice(
                      0,
                      ingredients.length / 3 + 1
                    )"
                    v-bind:key="ingredient.id"
                  >
                    <p style="color: #e33d26">
                      {{ ingredient.name }}
                    </p>

                    <label id="haveCheckbox"> I Currently Have It: </label>

                    <input
                      type="checkbox"
                      v-model="ingredient.have"
                      v-on:click="updateIngredient(ingredient)"
                      id="haveCheckbox"
                    /><br />
                    <label id="cookWithCheckbox">
                      I Want To Cook With It:</label
                    >
                    <input
                      type="checkbox"
                      v-on:click="updateQueryString(ingredient)"
                      v-model="ingredient.cookWith"
                      id="cookWithCheckbox"
                    /><br />

                    <button
                      v-on:click="deleteIngredient(ingredient)"
                      class="btn btn-primary"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
              <!-- end index-list -->
            </div>
            <!-- end index-box -->
          </div>
          <!-- end col -->

          <div class="card">
            <div class="index-box">
              <div class="index-head"></div>
              <div class="index-list">
                <ul>
                  <li
                    v-for="ingredient in ingredients.slice(
                      ingredients.length / 3 + 1,
                      (ingredients.length / 3) * 2
                    )"
                    v-bind:key="ingredient.id"
                  >
                    <p style="color: #e33d26">
                      {{ ingredient.name }}
                    </p>

                    <label id="haveCheckbox"> I Currently Have It: </label>

                    <input
                      type="checkbox"
                      v-model="ingredient.have"
                      v-on:click="updateIngredient(ingredient)"
                      id="haveCheckbox"
                    /><br />
                    <label id="cookWithCheckbox">
                      I Want To Cook With It:</label
                    >
                    <input
                      type="checkbox"
                      v-on:click="updateQueryString(ingredient)"
                      v-model="ingredient.cookWith"
                      id="cookWithCheckbox"
                    /><br />

                    <button
                      v-on:click="deleteIngredient(ingredient)"
                      class="btn btn-primary"
                    >
                      Delete
                    </button>

                    <!-- <span>4</span> -->
                  </li>
                </ul>
              </div>
              <!-- end index-list -->
            </div>
            <!-- end index-box -->
          </div>
          <!-- end col -->

          <div class="card">
            <div class="index-box">
              <div class="index-head"></div>
              <div class="index-list">
                <ul>
                  <li
                    v-for="ingredient in ingredients.slice(
                      (ingredients.length / 3) * 2,
                      ingredients.length - 1
                    )"
                    v-bind:key="ingredient.id"
                  >
                    <p style="color: #e33d26">
                      {{ ingredient.name }}
                    </p>

                    <label id="haveCheckbox"> I Currently Have It: </label>

                    <input
                      type="checkbox"
                      v-model="ingredient.have"
                      v-on:click="updateIngredient(ingredient)"
                      id="haveCheckbox"
                    /><br />
                    <label id="cookWithCheckbox">
                      I Want To Cook With It:</label
                    >
                    <input
                      type="checkbox"
                      v-on:click="updateQueryString(ingredient)"
                      v-model="ingredient.cookWith"
                      id="cookWithCheckbox"
                    /><br />

                    <button
                      v-on:click="deleteIngredient(ingredient)"
                      class="btn btn-primary"
                    >
                      Delete
                    </button>
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
          this.ingredients = this.ingredients.sort((a, b) => {
            var aName = a.name;
            var bName = b.name;
            if (aName < bName) {
              return -1;
            }
            if (aName > bName) {
              return 1;
            }
            return 0;
          });
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
