import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingListPage } from './shopping-list';

@NgModule({
  declarations: [
    ShoppingListPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingListPage),
  ],
  exports: [
    ShoppingListPage
  ],
  // providers:[
  //   ShoppingListService
  // ]
})
export class ShoppingListPageModule { }
