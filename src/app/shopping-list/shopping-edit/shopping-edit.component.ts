import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.modle';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameRef:ElementRef;
  // @ViewChild('amountInput') amountRef:ElementRef;
  subscription:Subscription;
  editMode=false;
  editedIndex:number;
  @ViewChild('f') sbForm:NgForm;


  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.ingredientsEdited.subscribe((index:number)=>{
      this.editMode=true;
      this.editedIndex = index;
      this.sbForm.setValue({
        name: this.slService.getShoppingList()[index].name,
        amount:this.slService.getShoppingList()[index].amount
      });
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onAddIngredient(form:NgForm){
    // const newIngredient = new Ingredient(this.nameRef.nativeElement.value, this.amountRef.nativeElement.value);
    const newIngredient  = new Ingredient(form.value.name, form.value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedIndex, newIngredient);
    }
    else{
      this.slService.addShoppingList(newIngredient);
    }
    
    form.reset();
    this.editMode=false;
  }

  onClear(){
    this.sbForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedIndex);
    this.onClear();
  }
}
