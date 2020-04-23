import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class ShoppingListService {
  ingredientEmitter = new Subject<void>();
  startedEditing = new Subject<number>();
  private ingredients: Array<Ingredient> = [
    new Ingredient('apple', 10),
    new Ingredient('tomato', 12),
    new Ingredient('milk', 12.7)
  ];

  constructor() {
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  onAddIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientEmitter.next();
  }

  onAddIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientEmitter.next();
  }

  onUpdateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientEmitter.next();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientEmitter.next();
  }
}
