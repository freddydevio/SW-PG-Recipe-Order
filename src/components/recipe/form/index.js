import template from './template.html'
import './style.css'

export default {
    name: 'RecipeForm',
    template,
    data() {
        return {
            recipeId: ''
        }
    },
    methods: {
        formSubmit
    }
}

function formSubmit() {
    this.$emit('submit', this.recipeId);
}
