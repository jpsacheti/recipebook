import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipes.model';
import { RecipesService } from '../../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  recipe: Recipe;
  @Input()
  index: number;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipe = this.recipesService.getRecipe(this.index);
  }
}
