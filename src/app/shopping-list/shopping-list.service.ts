import { Ingredient } from "../shared/ingredient.modle";
import { Subject } from "rxjs/Subject";

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    ingredientsEdited = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient("apples", 1),
        new Ingredient('tomatoes', 10)
      ];

    getShoppingList(){
        return this.ingredients.slice();
    }

    addShoppingList(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients);
    }

    addIngredientsSl(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
    }

    updateIngredient(index:number, newIngredient:Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients);//needed for other page to be updated
    }
}