import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient.model';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[] = []
  constructor(
    private shoppingListService: ShoppingListService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  ionViewWillEnter() {
    this.loadItems()
  }

  onAddItem(f: NgForm) {
    const value = f.value
    this.shoppingListService.addItem(value.ingredientName, value.amount)
    this.loadItems()
    f.reset()
  }

  onCheckItem(index) {
    this.shoppingListService.removeItem(index)
    this.loadItems()
  }

  private loadItems() {
    this.listItems = this.shoppingListService.getItems()
  }
}
