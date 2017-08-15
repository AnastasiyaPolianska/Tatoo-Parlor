import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ILogInModel } from '../shared/logInModel';
import { Message } from 'primeng/primeng';
import { Router} from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
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

    public TitleLogIn: string = "Click to log in";

    public Email: string = "";
    public Password: string = "";

    public EmailOk: boolean = true;
    public PasswordOk: boolean = true;

    public ToolErrorEmail: string;
    public ToolErrorPassword: string;

    public error: string;

    /*Logging into the system*/
    logIn(): void {
        this.EmailOk = true;;
        this.PasswordOk = true;

        var reg = new RegExp("(\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,6})");
        var containError = !reg.test(this.Email);

        if (containError){
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while logging in: enter your real email address" });
            this.EmailOk = false;
            this.ToolErrorEmail = "*Invalid email: enter your real email address.";
        }

        else {
            let tempModel: ILogInModel = { email: this.Email, password: this.Password, rememberMe: true };

            this._authService.logIn(tempModel).subscribe(data => {

                this.Msgs.push({ severity: 'success', summary: 'Success', detail: "You have logged in successfully. Now you will be rerouted to your cabinet." });

                this._authService.getUser().subscribe(
                    data => {
                        this._authService.IsLoggedIn = true;
                        this._authService.CurrentUserEmail = data.email;
                    },

                    err => {
                        this._authService.IsLoggedIn = false;
                        this._authService.CurrentUserEmail = "";
                    })

                setTimeout((router: Router) => {
                    this.router.navigate(['/cabinet'])
                }, 2000);
            }, err => {
                this.error = err;

                if (this.error == "Error while logging in: user with such email does not exist") {
                    this.ToolErrorEmail = "*Invalid email: enter your real email address.";
                    this.EmailOk = false;
                }

                if (this.error == "Error while logging in: incorect password.") {
                    this.ToolErrorPassword = "*Invalid current password: enter your current password correctly.";
                    this.PasswordOk = false;
                }

                this.Msgs.push({ severity: 'error', summary: 'Error', detail: err });
            });
        }       
    }
}