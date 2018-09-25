import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";

export class RecipeService {
    private recipes: Recipe[] = []

    addRecipe(
        title: string,
        description: string,
        difficulty: string,
        ingredients: Ingredient[]
    ) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredients))
    }

    getRecipes() {
        return this.recipes.slice()
    }

    removeRecipe(index: number) {
        return this.recipes.splice(index, 1)
    }

    updateRecipe(
        index: number,
        title: string,
        description: string,
        difficulty: string,
        ingredients: Ingredient[]
    ) {
        this.recipes[index] = new Recipe(title, description, difficulty, ingredients)
    }


}