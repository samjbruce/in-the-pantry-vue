<template>
  <div class="ingredients-index">
    <div class="head-title">
      <h3 class="page-title">Your Current Ingredients</h3>
    </div>
    <div id="main">
      <div class="centered" style="padding-bottom: 40px">
        <a
          :href="`/recipes?query=${queryStringIngredients}`"
          class="btn btn-primary"
          style="padding: 15px"
          >Cook With Chosen Ingredients</a
        >
      </div>
      <!-- end centered -->
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
                    <a href="">{{ ingredient.name }}</a
                    ><br />
                    <label id="haveCheckbox"> Have: </label>

                    <input
                      type="checkbox"
                      v-model="ingredient.have"
                      v-on:click="updateIngredient(ingredient)"
                      id="haveCheckbox"
                    />
                    <label id="cookWithCheckbox"> |Cook With:</label>
                    <input
                      type="checkbox"
                      v-on:click="updateQueryString(ingredient)"
                      v-model="ingredient.cookWith"
                      id="cookWithCheckbox"
                    />

                    <span>
                      <button
                        v-on:click="deleteIngredient(ingredient)"
                        class="btn btn-primary"
                      >
                        Delete
                      </button>
                    </span>
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
                    <a href="">{{ ingredient.name }}</a> <br />
                    <label id="haveCheckbox"> Have: </label>

                    <input
                      type="checkbox"
                      v-model="ingredient.have"
                      v-on:click="updateIngredient(ingredient)"
                      id="haveCheckbox"
                    />
                    <label id="cookWithCheckbox"> |Cook With:</label>
                    <input
                      type="checkbox"
                      v-on:click="updateQueryString(ingredient)"
                      v-model="ingredient.cookWith"
                      id="cookWithCheckbox"
                    />

                    <span>
                      <button
                        v-on:click="deleteIngredient(ingredient)"
                        class="btn btn-primary"
                      >
                        Delete
                      </button>
                    </span>
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
                    <a href="">{{ ingredient.name }}</a>
                    <br />
                    <label id="haveCheckbox"> Have: </label>

                    <input
                      type="checkbox"
                      v-model="ingredient.have"
                      v-on:click="updateIngredient(ingredient)"
                      id="haveCheckbox"
                    />
                    <label id="cookWithCheckbox"> |Cook With:</label>
                    <input
                      type="checkbox"
                      v-on:click="updateQueryString(ingredient)"
                      v-model="ingredient.cookWith"
                      id="cookWithCheckbox"
                    />

                    <span>
                      <button
                        v-on:click="deleteIngredient(ingredient)"
                        class="btn btn-primary"
                      >
                        Delete
                      </button>
                    </span>
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
      <div class="container" style="padding-top: 40px">
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="acc-box equal" style="padding: 20px">
              <h2>Add Some Ingredients to Your List!</h2>
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
                    class="form-control"
                    id="InputEmailAcc1"
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
      firstLetter: "",
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
