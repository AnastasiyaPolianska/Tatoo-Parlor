import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ISingUpModel } from '../shared/singUpModel';

@Component({
    templateUrl: './singup.component.html',
    styleUrls: ['./singup.component.scss']
})
export class SignUpComponent {

    constructor(private _authService: AuthService) { };

    public PageTitle: string = 'Registration Form';
    public LableFirstName: string = 'Enter First Name:';
    public PlaceHoldeFirstName: string = 'Enter first name...';
    public LableLastName: string = 'Enter Last Name:';
    public PlaceHoldeLastName: string = 'Enter last name...';
    public LableEmail: string = 'Enter email:';
    public PlaceHolderEmail: string = 'Enter email...';
    public LablePassword: string = 'Enter password:';
    public PlaceHolderPassword: string = 'Enter password...';
    public LableRepeatPassword: string = 'Repeat password:';
    public PlaceHolderRepeatPassword: string = 'Repeat password...';
    public ButtonText: string = 'Sign up';

    public FirstName: string ="";
    public LastName: string ="";
    public Email: string ="";
    public Password: string = "";

    /*Signing up*/
    signUp(): void {
        let tempModel: ISingUpModel = { email: this.Email, firstName: this.FirstName, lastName: this.LastName, password: this.Password };

        this._authService.signUp(tempModel).subscribe();
    }
}