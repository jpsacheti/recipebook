import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipesService} from '../recipes.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipesService) {
  }

  get ingControls() { // a getter!
    const ingredientsFormArray = this.recipeForm.get('ingredients') as FormArray;
    return ingredientsFormArray.controls;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onAddIngredient() {
    const formGroup = new FormGroup({
      ingredientName: new FormControl(null, Validators.required),
      ingredientAmount: new FormControl(null, [Validators.min(0), Validators.required])
    });
    this.ingControls.push(formGroup);
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let imagePath = '';
    const recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      imagePath = recipe.imagePath;
      recipe.ingredients.forEach(ing => {
        const formGroup = new FormGroup({
          ingredientName: new FormControl(ing.name, Validators.required),
          ingredientAmount: new FormControl(ing.amount, [Validators.min(0), Validators.required])
        });
        recipeIngredients.push(formGroup);
      });
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      ingredients: recipeIngredients
    });
  }
}
