import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Array<Recipe> = [
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
  @Output()
  recipeWasSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  constructor() {}

  ngOnInit() {}
  onRecipeSelected(selectedRecipe: Recipe) {
    this.recipeWasSelected.emit(selectedRecipe);
  }
}
