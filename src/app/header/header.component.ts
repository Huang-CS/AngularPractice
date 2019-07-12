import {Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    private userSub:Subscription

   /*  @Output() featureSelected = new EventEmitter<string>();
    
    onSelect(feature:string){
        this.featureSelected.emit(feature);
    } */

    constructor(private dataStorageService:DataStorageService, private authService:AuthService){}

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user=>{
            this.isAuthenticated = !!user;
        });
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }

    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes();
    }

    onLogout(){
        this.authService.logout();
    }
}