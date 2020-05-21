import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingListEditComponent} from './shopping-list-edit/shopping-list-edit.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListEditComponent],
  exports: [ShoppingListComponent, ShoppingListEditComponent],
  imports: [SharedModule, FormsModule]
})
export class ShoppingListModule {

}
