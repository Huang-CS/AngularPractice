import { Ingredient } from "../shared/ingredient.modle";
import { EventEmitter } from "@angular/core";

export class ShoppingListService{
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient("apples", 1),
        new Ingredient('tomatoes', 10)
      ];

    getShoppingList(){
        return this.ingredients.slice();
    }

    addShoppingList(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients);
    }

    addIngredientsSl(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
    }
}