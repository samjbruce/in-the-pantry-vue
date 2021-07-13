<template>
  <div class="ingredients-index">
    <div id="main">
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
        <div class="recipe-index centered" style="padding: 0px 300px 0px">
          <div class="card">
            <div class="index-box">
              <div class="index-head">
                <h3>Ingredients</h3>
              </div>
              <div class="index-list">
                <ul>
                  <li
                    v-for="ingredient in ingredients"
                    v-bind:key="ingredient.id"
                  >
                    <p class="h6">
                      {{ ingredient.name }}
                    </p>

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
        <div class="recipe-index card-columns">
          <div class="card">
            <div class="index-box">
              <div class="index-head">
                <h3>Ingredients</h3>
              </div>
              <div class="index-list">
                <ul>
                  <li
                    v-for="ingredient in ingredients"
                    v-bind:key="ingredient.id"
                  >
                    <p class="h6">
                      {{ ingredient.name }}
                    </p>

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
              <div class="index-head">
                <h3>Ingredients</h3>
              </div>
              <div class="index-list">
                <ul>
                  <li
                    v-for="ingredient in ingredients"
                    v-bind:key="ingredient.id"
                  >
                    <p class="h6">
                      {{ ingredient.name }}
                    </p>

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
              <div class="index-head">
                <h3>Ingredients</h3>
              </div>
              <div class="index-list">
                <ul>
                  <li
                    v-for="ingredient in ingredients"
                    v-bind:key="ingredient.id"
                  >
                    <p class="h6">
                      {{ ingredient.name }}
                    </p>

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
      // agIngredients: [],
      // hqIngredients: [],
      // rzIngredients: [],
    };
  },
  created: function () {
    axios.get("/ingredients").then((response) => {
      this.ingredients = response.data;
      // this.agIngredients = this.ingredients.filter(
      //   (ingredient) =>
      //     ingredient.name.startsWith("A") ||
      //     ingredient.name.startsWith("B") ||
      //     ingredient.name.startsWith("C") ||
      //     ingredient.name.startsWith("D") ||
      //     ingredient.name.startsWith("E") ||
      //     ingredient.name.startsWith("F") ||
      //     ingredient.name.startsWith("G")
      // );
      // this.hqIngredients = this.ingredients.filter(
      //   (ingredient) =>
      //     ingredient.name.startsWith("H") ||
      //     ingredient.name.startsWith("I") ||
      //     ingredient.name.startsWith("J") ||
      //     ingredient.name.startsWith("K") ||
      //     ingredient.name.startsWith("L") ||
      //     ingredient.name.startsWith("M") ||
      //     ingredient.name.startsWith("N") ||
      //     ingredient.name.startsWith("O") ||
      //     ingredient.name.startsWith("P") ||
      //     ingredient.name.startsWith("Q")
      // );
      // this.rzIngredients = this.ingredients.filter(
      //   (ingredient) =>
      //     ingredient.name.startsWith("R") ||
      //     ingredient.name.startsWith("S") ||
      //     ingredient.name.startsWith("T") ||
      //     ingredient.name.startsWith("U") ||
      //     ingredient.name.startsWith("V") ||
      //     ingredient.name.startsWith("W") ||
      //     ingredient.name.startsWith("X") ||
      //     ingredient.name.startsWith("Y") ||
      //     ingredient.name.startsWith("Z")
      // );
      // console.log(this.agIngredients);
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
          var index = this.agIngredients.indexOf(ingredient);
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
