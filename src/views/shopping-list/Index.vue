<template>
  <div class="shopping-list-index">
    <div class="head-title" style="padding: 40px">
      <div class="container">
        <div class="widget-title-outer">
          <h3 class="page-title">Your Grocery Shopping List</h3>
        </div>
      </div>
      <!-- end container -->
    </div>
    <!-- end head-title -->
    <div id="main">
      <div class="container">
        <div class="recipe-index centered" style="padding: 0px 350px 0px">
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
                      <strong>{{ ingredient.name }}</strong> |<label
                        >Purchased:</label
                      >
                      <input
                        type="checkbox"
                        v-model="ingredient.have"
                        v-on:click="updateIngredient(ingredient)"
                        id=""
                      />
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
