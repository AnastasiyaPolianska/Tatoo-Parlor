import { Component } from '@angular/core';
import { LocalStorage, SessionStorage, StorageProperty } from 'h5webstorage';
import { AuthService } from './shared/auth.service';
@Component({
    selector: 'pm-app',
    templateUrl: './app.component.html',
    styleUrls:['./app.component.css']
})
export class AppComponent {
    constructor(private localStorage: LocalStorage, private sessionStorage: SessionStorage, private authService: AuthService) {
    }
    pageTitle: string = 'Tatooed Youth';

    @StorageProperty({ storageKey: 'localAuthData', storage:"Local" }) public LocalAuth: string = "";
    @StorageProperty({ storageKey: 'sessionAuthData', storage: "Session" }) public SessionAuth: string = "";
     
    isLoggedIn = (() => {
        if (this.LocalAuth == "" && this.SessionAuth == "")
            return false;
        else return true;
    });

    loggedUserName = (() =>
    {
        if (this.LocalAuth != "")
            return this.LocalAuth;
        else return this.SessionAuth;
    })

    logOut = (() => {
        this.authService.logOut().subscribe();
    })

}
