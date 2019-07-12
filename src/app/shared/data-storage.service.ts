import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";
import { stringify } from "querystring";
import { take } from "rxjs/operator/take";

@Injectable()
export class DataStorageService {
    private token: string = null;

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://angular-ac6a2.firebaseio.com/recipes.json', recipes,
            {
                params: new HttpParams().set('auth', this.token)
            }).subscribe(
                response => {
                    console.log(response);
                }
            );
    }

    fetchRecipes() {

        this.authService.user.take(1).subscribe(data => {
            this.token = data.token;
        })

        this.http.get<Recipe[]>('https://angular-ac6a2.firebaseio.com/recipes.json',
            {
                params: new HttpParams().set('auth', this.token)
            }).subscribe(
                response => {
                    console.log(response);
                    this.recipeService.setRecipes(response);
                }
            );
    }
}
