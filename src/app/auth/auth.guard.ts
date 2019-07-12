import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";

@Injectable()
// @Injectable(providedIn: 'root')
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router:Router) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
        return this.authService.user.pipe(map(user => {
            const isAuth = !!user;

            if(isAuth) return true;
            else{
                this.router.navigate(['/auth']);
                return false;
            }
        }
        ))
    }

}