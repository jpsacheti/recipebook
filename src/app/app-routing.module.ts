import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { NoRecipeSelectedComponent } from './recipes/no-recipe-selected/no-recipe-selected.component';

const appRoutes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [{
      path: '',
      component: NoRecipeSelectedComponent
    },{
      path: ':id',
      component: RecipesDetailComponent
    }]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  },
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
