import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipeService } from './services/recipe.service';
import { ShoppingService } from './services/shopping.service';



@NgModule({
  providers: [
    RecipeService,
    ShoppingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
})
export class CoreModule { }
