import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private recipeService: RecipeService, private httpClient: HttpClient) { }


  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put('https://fb-angular-chef-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(recipes => {
        console.log(recipes);
        alert("Recipe data saved!")
      })
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>('https://fb-angular-chef-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          })
        }), tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}
