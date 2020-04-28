import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipes.model';
import {Observable} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipesService} from './recipes.service';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recipesService: RecipesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length > 0) {
      return recipes;
    }
    return this.dataStorageService.fetchRecipes();
  }
}
