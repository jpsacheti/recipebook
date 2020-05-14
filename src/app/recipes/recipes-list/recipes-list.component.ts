import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipes.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  recipes: Array<Recipe>;
  changeSubscription: Subscription;

  constructor(private recipesService: RecipesService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
    this.changeSubscription = this.recipesService.updatedRecipes.subscribe(recipes => {
      console.log(recipes);
      this.recipes = recipes;
    });
  }

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
