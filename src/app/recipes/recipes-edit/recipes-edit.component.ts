import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
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

  constructor(private route: ActivatedRoute, private recipeService: RecipesService, private router: Router) {
  }

  get ingControls() {
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
    const formValues = this.recipeForm.value;
    if (this.editMode) {
      this.recipeService.mergeRecipe(formValues, this.id);
    } else {
      this.recipeService.mergeRecipe(formValues);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    const formGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.min(0), Validators.required])
    });
    this.ingControls.push(formGroup);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(i: number) {
    const ingredientsFormArray = this.recipeForm.get('ingredients') as FormArray;
    ingredientsFormArray.removeAt(i);
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
          name: new FormControl(ing.name, Validators.required),
          amount: new FormControl(ing.amount, [Validators.min(0), Validators.required])
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
