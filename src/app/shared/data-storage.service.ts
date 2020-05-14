import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipesService} from '../recipes/recipes.service';
import {Recipe} from '../recipes/recipes.model';
import {map, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  private readonly url = 'https://ng-jpsacheti.firebaseio.com/recipes.json';

  constructor(private  httpClient: HttpClient, private recipesService: RecipesService, private authService: AuthService) {
  }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.httpClient.put(this.url, recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>(this.url)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            recipe.ingredients = recipe.ingredients ?? [];
            return recipe;
          });
        }), tap(recipes => {
          this.recipesService.setRecipes(recipes);
        }));
  }
}
