import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.modle";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()

export class RecipeService{
   // recipeSelected = new EventEmitter<Recipe>();

    private recipes:Recipe[] = [
        new Recipe('Recipe 1','This is a test1',
        'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/7/22/3/FNM090116_Grilled-Steak-and-Greek-Corn-Salad_s4x3.jpg.rend.hgtvcom.966.725.suffix/1469255050835.jpeg',
        [
            new Ingredient('Meat',1),
            new Ingredient('French Fries', 20)

        ]),
        new Recipe('Recipe 2','This is a test2',
        'https://images.media-allrecipes.com/images/56610.png',
        [
            new Ingredient('Banana',7),
            new Ingredient('Orange', 3)
        ])
      ];

    constructor(private slService:ShoppingListService){}  
    
    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(id:number){
        return this.recipes[id];
    }

    addToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredientsSl(ingredients)
    }
}