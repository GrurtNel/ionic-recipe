import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  constructor(
    public navParams: NavParams,
    private actionsheetCtrl: ActionSheetController
  ) {
  }

  ngOnInit(): void {
    this.mode = this.navParams.get('mode')
    this.initialForm()
  }

  onManageIngredients() {
    const actionSheet = this.actionsheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient', handler: () => {

          }
        },
        {
          text: 'Remove All Ingredient', handler: () => {

          }
        },
        {
          text: 'Cancel', role:'cancel'
        }
      ]
    })
    actionSheet.present()
  }

  private initialForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required)
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

}
