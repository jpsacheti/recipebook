import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  private ingredients: Array<Ingredient> = [
    new Ingredient('apple', 10),
    new Ingredient('tomato', 12),
    new Ingredient('milk', 12.7)
  ];
  ingredientEmitter = new EventEmitter<void>();

  constructor() {}
  getIngredients() {
    return this.ingredients.slice();
  }
  onAddIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientEmitter.emit();
  }

  onAddIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientEmitter.emit();
  }
}