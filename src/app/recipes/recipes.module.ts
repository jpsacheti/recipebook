import {NgModule} from '@angular/core';
import {RecipesComponent} from './recipes.component';
import {RecipesListComponent} from './recipes-list/recipes-list.component';
import {RecipesEditComponent} from './recipes-edit/recipes-edit.component';
import {RecipesDetailComponent} from './recipes-detail/recipes-detail.component';
import {RecipesItemComponent} from './recipes-list/recipes-item/recipes-item.component';
import {NoRecipeSelectedComponent} from './no-recipe-selected/no-recipe-selected.component';
import {Route, RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthGuard} from '../auth/auth.guard';
import {RecipeResolverService} from './recipe-resolver.service';

const recipesRoutes: Route = {
  path: 'recipes',
  component: RecipesComponent,
  canActivate: [AuthGuard],
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
};

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    NoRecipeSelectedComponent,
    RecipesEditComponent,
  ],
  exports: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    NoRecipeSelectedComponent,
    RecipesEditComponent,
  ],
  imports: [
    RouterModule.forChild([recipesRoutes]),
    ReactiveFormsModule,
    CommonModule
  ]
})
export class RecipesModule {}
