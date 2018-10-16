import template from './template.html'
import './style.css'
import api from "../../js/api";

import RecipeForm from './form/index';
import IngredientsList from './ingredients/index';

export default {
    template,
    name: 'recipe',
    components: {
        RecipeForm,
        IngredientsList
    },
    data() {
        return {
            recipe: null,
            groups: {},
        }
    },
    methods: {
        findRecipe,
        searchProducts
    }
}

function searchProducts() {
    let me = this;

    api.searchProducts(me.groups, function (response) {
        console.log(response);
    });
}

function findRecipe(recipeId) {
    let me = this;

    api.getRecipe(recipeId, function (response) {
        me.recipe = JSON.parse(response);
        me.groups = me.recipe.ingredientGroups;
    });

    console.log(this.searchProducts());
}
