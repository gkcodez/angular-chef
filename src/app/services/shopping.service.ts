import { Ingredient } from "../shared/ingredient.model";

export class ShoppingService {
    
    private ingredients = [
        new Ingredient('Apple', 5),
        new Ingredient('Orange', 3)
      ];

      getIngredients(){
        return this.ingredients;
      }

      addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
      }

      addIngredients(ingredients: Ingredient[]){
        ingredients.forEach(ingredient => {
          this.ingredients.push(ingredient);
        });
      }
}