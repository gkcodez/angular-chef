import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {}

  addIngredient(shoppingForm: NgForm) {
    const ingredient = new Ingredient(
      shoppingForm.value.name,
      shoppingForm.value.amount
    );
    this.shoppingService.addIngredient(ingredient);
  }
}
