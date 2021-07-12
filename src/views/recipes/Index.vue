<template>
  <div class="recipes-index">
    <div class="head-title">
      <div class="container">
        <h4>You're searching for recipes with:</h4>
        <div
          v-for="queryIngredient in queryIngredients"
          v-bind:key="queryIngredient.id"
        >
          <p>{{ queryIngredient }}</p>
        </div>
      </div>
      <!-- end container -->
    </div>
    <!-- end head-title -->
    <div id="main">
      <div class="container">
        <div id="primary" class="content-area fullwidth">
          <div id="content" class="site-content">
            <div class="row">
              <div
                class="col-6 col-md-3"
                v-for="recipe in recipes.recipes"
                v-bind:key="recipe.id"
              >
                <div class="recipe-thumb">
                  <img :src="recipe.image_url" alt="Recipe Image" />
                  <a href="#" class="bookmarker"
                    ><i class="fas fa-bookmark"></i
                  ></a>
                  <a :href="`/recipes/${recipe.recipe_id}`" class="view-recipe"
                    >VIEW RECIPE</a
                  >
                </div>
                <div class="recipe-desc">
                  <h2 class="recipe-title">
                    <a :href="`/recipes/${recipe.recipe_id}`">{{
                      recipe.title
                    }}</a>
                  </h2>
                  <p>
                    <em
                      ><div
                        v-for="ingredient in recipe.used_ingredients"
                        v-bind:key="ingredient.id"
                      >
                        <p>{{ ingredient }}</p>
                      </div></em
                    >
                  </p>
                </div>
                <!-- end recipe-desc -->
              </div>
              <!-- end col -->
            </div>
            <!-- end row -->
          </div>
          <!-- end content -->
        </div>
        <!-- end primary -->
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
      recipes: [],
      ingredients: [],
      newFavoriteParams: {},
      queryIngredients: [],
    };
  },
  created: function () {
    var queryStringIngredients = this.$route.query.query;
    this.queryIngredients = this.$route.query.query.split(",");
    console.log("recipesIndex", queryStringIngredients);
    axios.get(`/recipes?query=${queryStringIngredients}`).then((response) => {
      console.log(response.data);
      this.recipes = response.data;
    });
  },
  methods: {
    recipesShow: function (recipe) {
      this.$router.push(`/recipes/${recipe.recipe_id}`);
    },
    favoriteNew: function (recipe) {
      this.newFavoriteParams.spoonacular_api_id = recipe.recipe_id;
      axios.post("/favorites", this.newFavoriteParams).then((response) => {
        console.log(response.data);
        this.$router.push("/favorites");
      });
    },
  },
};
</script>
