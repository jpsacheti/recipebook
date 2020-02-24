import { Recipe } from './recipes.model';
import { EventEmitter } from '@angular/core';

export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Array<Recipe> = [
    new Recipe(
      'A test recipe',
      'This is just a test!',
      'https://cdn.pixabay.com/photo/2019/07/17/09/19/strawberry-cake-4343499_960_720.jpg'
    ),
    new Recipe(
      'A test recipe 2',
      'This is just a test! 2',
      'https://cdn.pixabay.com/photo/2019/07/17/09/19/strawberry-cake-4343499_960_720.jpg'
    )
  ];
  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }
}
