import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent 
{
    constructor(private _authService: AuthService) { };

    public Maintitle: string = 'My cabinet';
    public Subtitle: string = 'Feel yourself at home.';

    public FirstnameLabel: string = "First name: ";
    public LastnameLabel: string = "Last name: ";
    public EmailLabel: string = "Email: ";

    public FirstName: string;
    public LastName: string;
    public Email: string;

    /*Getting user info from database on server side*/
    GetUser(): void {
        this._authService.getUser().subscribe(data => {
            this.Email = data.email;
            this.LastName = data.lastName;
            this.FirstName = data.firstName;
        })
    }

    /*Executes on initialisation of page*/
    ngOnInit() {
        this.GetUser();
    }
}