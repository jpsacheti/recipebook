import {Recipe} from './recipes.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipesService {
  slService: ShoppingListService;
  updatedRecipes: Subject<void> = new Subject<void>();
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

  constructor(slService: ShoppingListService) {
    this.slService = slService;
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.getRecipes()[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.onAddIngredients(ingredients);
  }

  mergeRecipe(recipe: Recipe, index?: number) {
    if (index != null) {
      this.recipes[index] = recipe;
    } else {
      this.recipes.push(recipe);
    }
    this.updatedRecipes.next();
  }
}
