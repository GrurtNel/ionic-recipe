import { Recipe } from './../../models/recipe.model';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipeService } from '../../services/recipe.service';

/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage  {

  recipes: Recipe[] = []
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private recipeService: RecipeService
  ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.loadRecipes()
    console.log('ionViewWillEnter ', this.recipes);    
  }
  

  onLoadRecipe(i: number, recipe: Recipe) {
    this.navCtrl.push('RecipePage', { recipe: recipe, index: i })
  }

  onAddRecipe() {
    this.navCtrl.push('EditRecipePage', { mode: 'New' })
  }

  onViewWillLoad() {
    this.loadRecipes()
  }

  loadRecipes() {
    this.recipes = this.recipeService.getRecipes()

  }
}
