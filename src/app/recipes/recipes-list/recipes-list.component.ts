import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipes: Array<Recipe>;
  constructor(private recipesService: RecipesService, private router: Router) {}

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
  }

  onRecipeSelected(id: number) {
    this.router.navigate(['recipes', id]);
  }
}
