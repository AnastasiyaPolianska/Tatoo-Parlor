import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ILogInModel } from '../shared/logInModel';
import { Message } from 'primeng/primeng';
import { Router} from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LogInComponent {

    constructor(private _authService: AuthService, private router: Router) { };

    public PageTitle: string = 'Log in';
    public LableEmail: string = 'Enter email:';
    public PlaceHolderEmail: string = 'Enter email...';
    public LablePassword: string = 'Enter password:';
    public PlaceHolderPassword: string = 'Enter password...';
    public ButtonText: string = 'Log in';
    public Msgs: Message[] = [];

    public Email: string = "";
    public Password: string = "";

    /*Logging into the system*/
    logIn(): void {
        let tempModel: ILogInModel = { email: this.Email, password: this.Password, rememberMe: true };

        this._authService.logIn(tempModel).subscribe(data => {
            setTimeout((router: Router) => {
                this.router.navigate(['/cabinet'])
            }, 2000);           
        }, err => {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: err });
        });
    }
}