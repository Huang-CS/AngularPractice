import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selected: Recipe;

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

  ngOnInit() {
    // this.recipeService.recipeSelected.subscribe(
    //   (recipe:Recipe)=>{
    //     this.selected = recipe;
    //   }
    // )

    this.dataStorageService.fetchRecipes();
  }

}
