import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipes.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipes: Array<Recipe>;

  constructor(private recipesService: RecipesService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
    this.recipesService.updatedRecipes.subscribe(() => {
      this.recipes = this.recipesService.getRecipes();
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
