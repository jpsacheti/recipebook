import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Array<Ingredient> = [new Ingredient('apple', 10), new Ingredient('tomato', 12), new Ingredient('milk', 12.7)];

  constructor() { }

  ngOnInit() {
  }

  onAddIngredient(ingredient: Ingredient){

  }

}
