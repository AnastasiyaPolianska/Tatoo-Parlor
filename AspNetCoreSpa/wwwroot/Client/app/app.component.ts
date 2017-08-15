import { Component,  ViewEncapsulation, OnInit } from '@angular/core';
import { LocalStorage, SessionStorage, StorageProperty } from 'h5webstorage';
import { AuthService } from './shared/auth.service';
@Component({
    selector: 'pm-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    constructor(private localStorage: LocalStorage, private sessionStorage: SessionStorage, private authService: AuthService) {
    }
    public pageTitle: string = 'Tatooed Youth';

    @StorageProperty({ storageKey: 'localAuthData', storage:"Local" }) public LocalAuth: string = "";
    @StorageProperty({ storageKey: 'sessionAuthData', storage: "Session" }) public SessionAuth: string = "";
     
    /*Executes on initialisation*/
    ngOnInit(): void {
        this.GettingUserInfo();
    };

    public GettingUserInfo(): void {
        this.authService.getUser().subscribe(
            data => {
                this.authService.IsLoggedIn = true;
                this.authService.CurrentUserEmail = data.email;
                this.authService.IsAdmin = data.isAdmin;
            },

            err => {
                this.authService.IsLoggedIn = false;
                this.authService.CurrentUserEmail = "";
                this.authService.IsAdmin = false;
            })
    }

    logOut = (() => {
        this.authService.logOut().subscribe(
            data => {
                this.authService.IsLoggedIn = false;
                this.authService.CurrentUserEmail = "";
                this.authService.IsAdmin = false;
            }
        );
    });
}