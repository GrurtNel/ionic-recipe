import { ShoppingListService } from './../../services/shopping-list.service';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { RecipeService } from './../../services/recipe.service';
import { Recipe } from './../../models/recipe.model';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  recipe: Recipe
  index: number
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private recipeService: RecipeService,
    private slService: ShoppingListService
  ) {
  }

  ngOnInit(): void {
    this.recipe = this.navParams.get('recipe')
    this.index = this.navParams.get('index')
  }

  onLoadRecipe() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  ionViewWillLoad() {
    console.log('ionViewWillLoad RecipePage');
  }

  onAddIngredients() {
    this.slService.addItems(this.recipe.ingredients)
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index)
    this.navCtrl.popToRoot()
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'Edit', recipe: this.recipe, index: this.index })
  }
}
