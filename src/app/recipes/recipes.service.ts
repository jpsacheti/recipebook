import { Recipe } from './recipes.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Array<Recipe> = [
    new Recipe(
      'Pancakes',
      'It\' nice for breakfast!',
      'https://cdn.pixabay.com/photo/2019/07/17/09/19/strawberry-cake-4343499_960_720.jpg',
      [
        new Ingredient('eggs', 1),
        new Ingredient('milk', 0.5),
        new Ingredient('flour', 10)
      ]
    ),
    new Recipe(
      'Strawberry cake',
      'Perfect for parties',
      'https://cdn.pixabay.com/photo/2019/07/17/09/19/strawberry-cake-4343499_960_720.jpg',
      [
        new Ingredient('eggs', 1),
        new Ingredient('milk', 0.5),
        new Ingredient('flour', 10),
        new Ingredient('strawberry', 10)
      ]
    )
  ];
  slService: ShoppingListService;
  constructor(slService: ShoppingListService) {
    this.slService = slService;
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.onAddIngredients(ingredients);
  }
}
