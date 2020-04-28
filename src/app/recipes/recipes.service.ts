import {Recipe} from './recipes.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipesService {
  slService: ShoppingListService;
  updatedRecipes: Subject<void> = new Subject<void>();
  private recipes: Array<Recipe> = [];

  constructor(slService: ShoppingListService) {
    this.slService = slService;
  }

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.updatedRecipes.next();
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

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.updatedRecipes.next();
  }
}
