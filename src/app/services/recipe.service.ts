import { EventEmitter, Output } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService {
    
 selectedRecipe = new EventEmitter<Recipe>();


    private recipes: Recipe[] = [
        new Recipe('Salad', 
        'Fresh Vegetable Salad with mixed Fruits', 
        'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        [
          new Ingredient('Tomato', 1),
        new Ingredient('Carrot', 5)
      ]),
        new Recipe('Noodles', 
        'Hot chicken noodles with tomato sauce', 
        'https://images.pexels.com/photos/14737/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        [
          new Ingredient('Cheese', 2),
        new Ingredient('Butter', 4)
      ])
      ];

      getRecipes(){
        return this.recipes.slice();
      }

      getRecipeWithId(id: number){
        return this.recipes.slice()[id];
      }

}