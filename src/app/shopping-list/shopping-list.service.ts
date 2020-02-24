import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  private ingredients: Array<Ingredient> = [
    new Ingredient('apple', 10),
    new Ingredient('tomato', 12),
    new Ingredient('milk', 12.7)
  ];
  ingredientEmitter = new EventEmitter<Ingredient>();

  constructor() {}
  getIngredients() {
    return this.ingredients.slice();
  }
  onAddIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
