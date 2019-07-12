import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
//import { throwError} from 'rxjs';
import { _throw as throwError } from 'rxjs/observable/throw';
import { User } from "./user.model";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";


export interface AuthResponse {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthService {
    user = new BehaviorSubject <User>(null);

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponse>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBiu8XC_c-1QSrPhuZB2x5fXmjO_TGyPdM',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(error => {
                return this.handleError(error)
            }),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn); //+ convert string to number
            })
        )
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBiu8XC_c-1QSrPhuZB2x5fXmjO_TGyPdM',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn); //+ convert string to number
            }))
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
    }

    autoLogin() {
        const userData: { email: string; id: string; _token: string; _tokenExpirationDate: string } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) return;

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

        if(loadedUser.token) this.user.next(loadedUser);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);

        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!';

        if (!error.error || !error.error.error) return throwError(errorMessage);

        switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;
        }

        return throwError(errorMessage);
    }
}