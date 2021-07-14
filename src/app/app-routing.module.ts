import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'auth', loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule) },
    { path: 'shopping', loadChildren: () => import("./shopping-list/shopping.module").then(m => m.ShoppingModule) },
    { path: 'recipes', loadChildren: () => import("./recipes/recipes.module").then(m => m.RecipesModule) },
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
}
)
export class AppRoutingModule {

}