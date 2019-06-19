import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.modle';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription:Subscription;

  constructor(private slList:ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slList.getShoppingList();
    this.subscription = this.slList.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients = ingredients
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onEditIngredient(index:number){
    this.slList.ingredientsEdited.next(index);
  }

  // ngDoCheck(): void {
  //   //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //   //Add 'implements DoCheck' to the class.
  //   this.ingredients = this.slList.getShoppingList();
  //   console.log('YYYYYYYYYYYYYYYYYYYYYYYYYYYY');
  // }

}
