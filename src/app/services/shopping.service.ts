import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingService {

  private ingredients = [
    new Ingredient('Apple', 5),
    new Ingredient('Orange', 3)
  ];

  editIngredient = new Subject<number>();

  getIngredients() {
    return this.ingredients;
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }


  updateIngredient(ingredient: Ingredient, index: number) {
    this.ingredients[index] = ingredient;
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1)
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(ingredient => {
      this.ingredients.push(ingredient);
    });
  }
}