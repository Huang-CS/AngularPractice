import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.modle';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (paras: Params) => {
        this.id = +paras['id']; //cast from stirng to number
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  addToSl(ingredients: Ingredient[]) {
    this.recipeService.addToShoppingList(ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

}
