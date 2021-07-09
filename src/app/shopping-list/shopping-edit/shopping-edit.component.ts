import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private shoppingService: ShoppingService) { }
  editMode: boolean = false;
  editedItem: Ingredient;
  editedItemIndex: number;
  subscription: Subscription;
  @ViewChild("shoppingForm") shoppingForm: NgForm;


  ngOnInit(): void {
    this.subscription = this.shoppingService.editIngredient.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      }
    )
  }

  submitForm(shoppingForm: NgForm) {
    const ingredient = new Ingredient(
      shoppingForm.value.name,
      shoppingForm.value.amount
    );
    if (!this.editMode) {
      this.shoppingService.addIngredient(ingredient);
    } else {
      this.shoppingService.updateIngredient(ingredient, this.editedItemIndex);
    }
    shoppingForm.reset();
    this.editMode = false;
  }

  deleteIngredient() {
    this.shoppingForm.reset();
    this.editMode = false;
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.editedItemIndex = undefined;
  }

  clearIngredient() {
    this.editedItemIndex = undefined;
    this.shoppingForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
