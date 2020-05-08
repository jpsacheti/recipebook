import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipesDetailComponent} from './recipes/recipes-detail/recipes-detail.component';
import {NoRecipeSelectedComponent} from './recipes/no-recipe-selected/no-recipe-selected.component';
import {RecipesEditComponent} from './recipes/recipes-edit/recipes-edit.component';
import {RecipeResolverService} from './recipes/recipe-resolver.service';
import {AuthComponent} from './auth/auth.component';

const appRoutes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: NoRecipeSelectedComponent
      },
      {
        path: 'new',
        component: RecipesEditComponent
      },
      {
        path: ':id',
        component: RecipesDetailComponent,
        resolve: [RecipeResolverService]
      },
      {
        path: ':id/edit',
        component: RecipesEditComponent,
        resolve: [RecipeResolverService]
      }
    ]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  },
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
