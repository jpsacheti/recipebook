import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
export class ShoppingListService {
  private ingredients: Array<Ingredient> = [
    new Ingredient('apple', 10),
    new Ingredient('tomato', 12),
    new Ingredient('milk', 12.7)
  ];
  ingredientEmitter = new Subject<void>();

  constructor() {}
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
}
