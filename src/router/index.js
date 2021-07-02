import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersShow from "../views/users/Show.vue";
import IngredientsIndex from "../views/ingredients/Index.vue";
import FavoritesIndex from "../views/favorites/Index.vue";
import RecipesIndex from "../views/recipes/Index.vue";
import RecipesShow from "../views/recipes/Show.vue";
import ShoppingListIndex from "../views/shopping-list/Index.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/users/:id", name: "users-show", component: UsersShow },
  {
    path: "/ingredients",
    name: "ingredients-index",
    component: IngredientsIndex,
  },
  {
    path: "/favorites",
    name: "favorites-index",
    component: FavoritesIndex,
  },
  {
    path: "/recipes",
    name: "recipes-index",
    component: RecipesIndex,
  },
  {
    path: "/recipes/:id",
    name: "recipes-show",
    component: RecipesShow,
  },
  {
    path: "/shopping-list",
    name: "shopping-list-index",
    component: ShoppingListIndex,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
