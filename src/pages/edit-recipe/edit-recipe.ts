import { Ingredient } from './../../models/ingredient.model';
import { Recipe } from './../../models/recipe.model';
import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

/**
 * Generated class for the EditRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode = 'New'
  selectOptions = ['Easy', 'Medium', 'Hard']
  recipeForm: FormGroup
  recipe: Recipe
  index: number
  constructor(
    public navParams: NavParams,
    private navCtrl: NavController,
    private actionsheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipeService: RecipeService
  ) {
  }

  ngOnInit(): void {
    this.mode = this.navParams.get('mode')
    if (this.mode === 'Edit') {
      this.recipe = this.navParams.get('recipe')
      this.index = this.navParams.get('index')
    }
    this.initialForm()
  }

  private initialForm() {
    let title = null
    let description = null
    let difficulty = 'Medium'
    let ingredients = []

    if (this.mode == 'Edit') {
      title = this.recipe.title
      description = this.recipe.description
      difficulty = this.recipe.difficulty
      for (const ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required))
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    })
  }

  onManageIngredients() {
    const actionSheet = this.actionsheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient', handler: () => {
            this.createNewIngredientAlert().present()
          }
        },
        {
          text: 'Remove All Ingredient', role: 'destructive', handler: () => {
            const fArray = this.recipeForm.get('ingredients') as FormArray
            const len = fArray.length
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i)
              }
            }

          }
        },
        {
          text: 'Cancel', role: 'cancel'
        }
      ]
    })
    actionSheet.present()
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        { name: 'name', placeholder: 'Name' }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add', handler: (data) => {
            if (data.name.trim() == '' || !data.name) {
              this.toastCtrl.create({
                message: 'Please enter a valid value!',
                duration: 1000,
                position: 'top'
              }).present()
              return
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required))
            this.toastCtrl.create({
              message: 'Item Added!',
              duration: 1000,
              position: 'top'
            }).present()
          }
        }
      ]
    })
  }

  onSubmit() {
    const value = this.recipeForm.value
    let ingredients = []
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return { name: name, amount: 1 }
      })
    }
    if (this.mode == 'Edit') {
      this.recipeService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients)
    } else {
      this.recipeService.addRecipe(value.title, value.description, value.difficulty, ingredients)
    }
    this.recipeForm.reset()
    this.navCtrl.popToRoot()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

}
