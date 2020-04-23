import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../recipes.model';
import {RecipesService} from '../../recipes.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  recipe: Recipe;
  @Input()
  index: number;

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit() {
    this.recipe = this.recipesService.getRecipe(this.index);
  }
}
