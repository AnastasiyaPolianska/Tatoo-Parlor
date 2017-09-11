import { Component,  ViewEncapsulation, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'pm-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    constructor( private authService: AuthService, private _router: Router) {
    }
    public pageTitle: string = 'Tatooed Youth';
     
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
                this._router.navigate(['/login']);
            }
        );
    });
}