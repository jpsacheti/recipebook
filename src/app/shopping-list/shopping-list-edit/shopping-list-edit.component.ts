import {
  Component,
  OnInit,
  ElementRef,
  ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false })
  nameInputRef: ElementRef;

  @ViewChild('amountInput', { static: false })
  amountInputRef: ElementRef;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit() {}
  onAddItem() {
    const ingredientName = this.nameInputRef.nativeElement.value;
    const ingredientAmount = this.amountInputRef.nativeElement.value;
    const ingredient = new Ingredient(ingredientName, ingredientAmount);
    this.shoppingService.onAddIngredient(ingredient);
  }
}
