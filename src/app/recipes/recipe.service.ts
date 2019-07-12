import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.modle";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";

@Injectable()

export class RecipeService{
   // recipeSelected = new EventEmitter<Recipe>();
   recipesChanged = new Subject<Recipe[]>();

    // private recipes:Recipe[] = [
    //     new Recipe('Recipe 1','This is a test1',
    //     'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/7/22/3/FNM090116_Grilled-Steak-and-Greek-Corn-Salad_s4x3.jpg.rend.hgtvcom.966.725.suffix/1469255050835.jpeg',
    //     [
    //         new Ingredient('Meat',1),
    //         new Ingredient('French Fries', 20)

    //     ]),
    //     new Recipe('Recipe 2','This is a test2',
    //     'https://images.media-allrecipes.com/images/56610.png',
    //     [
    //         new Ingredient('Banana',7),
    //         new Ingredient('Orange', 3)
    //     ])
    //   ];

    private recipes:Recipe[] =[];

    constructor(private slService:ShoppingListService){}  
    
    getRecipes(){
        return this.recipes.slice();
    }

    setRecipes(recipes:Recipe[]){
       this.recipes = recipes;
       this.recipesChanged.next(this.recipes.slice());
    }

    getRecipe(id:number){
        return this.recipes[id];
    }

    addToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredientsSl(ingredients)
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}