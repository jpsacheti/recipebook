import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from 'src/app/shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  editSubs: Subscription;
  editMode = false;
  editedItemIndex: number;
  @ViewChild('formulario')
  formulario: NgForm;

  constructor(private shoppingService: ShoppingListService) {
    this.editSubs = this.shoppingService.startedEditing.subscribe((index: number) => {
      this.fillEditInfo(index);
    });
  }

  ngOnInit() {
  }

  onSubmit(formulario: NgForm) {
    const ingredientName = formulario.value.name;
    const ingredientAmount = +formulario.value.amount;
    const ingredient = new Ingredient(ingredientName, ingredientAmount);
    if (this.editMode) {
      this.shoppingService.onUpdateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingService.onAddIngredient(ingredient);
    }
    this.formulario.resetForm();
    this.editMode = false;
  }

  reset(formulario: NgForm) {
    formulario.resetForm();
    this.editMode = false;
  }

  onDeleteItem() {
    if (confirm('Are you sure you want to delete this item?')) {
      this.shoppingService.deleteIngredient(this.editedItemIndex);
      this.reset(this.formulario);
    }
  }

  ngOnDestroy(): void {
    this.editSubs.unsubscribe();
  }

  private fillEditInfo(index: number) {
    this.editMode = true;
    this.editedItemIndex = index;
    const editedIngredient = this.shoppingService.getIngredient(index);
    this.formulario.setValue({
      name: editedIngredient.name,
      amount: editedIngredient.amount
    });
  }
}
