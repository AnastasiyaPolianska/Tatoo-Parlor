import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ISingUpModel } from '../shared/singUpModel';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';

@Component({
    templateUrl: './singup.component.html',
    styleUrls: ['./singup.component.scss']
})
export class SignUpComponent {

    constructor(private _authService: AuthService, private router: Router) { };

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

    public ToolFirstName: string = "*Use any letters, numbers and symbols: -,',_ . From 4 to 15 characters.";
    public FirstNameOK: boolean = true;
    public ToolErrorFirstName: string;

    public ToolLastName: string = "*Use any letters, numbers and symbols: -,',_ . From 4 to 15 characters.";
    public ToolErrorLastName: string = "";
    public LastNameOK: boolean = true;

    public ToolEmail: string = "*Enter your new email correctly.";
    public ToolErrorEmail: string = "";
    public EmailOK: boolean = true;

    public ToolPassword: string = "*Use any letters, numbers or symbols. Must be at least one digit, one small letter and one capital letter. From 8 to 100 characters.";
    public ToolErrorPassword: string = "";
    public ToolPasswordRepeat: string = "*Repeat new password, make sure it is exactly the same as entered.";
    public ToolErrorPasswordRepeat: string = "";
    public PasswordOK: boolean = true;
    public RepeatPasswordOK: boolean = true;

    public FirstName: string ="";
    public LastName: string ="";
    public Email: string ="";
    public Password: string = "";
    public RepeatPassword: string = "";

    public TitleSignUp: string = "Click to sign up";

    public Msgs: Message[] = [];
    public error: string;

    /*Signing up*/
    signUp(): void {
        this.FirstNameOK = true;
        this.LastNameOK = true;
        this.EmailOK = true;
        this.PasswordOK = true;
        this.RepeatPasswordOK = true;

        var validFirstName = true;
        var validLastName = true;
        var validEmail = true;
        var validPassword = true;

        //check first name
        if (this.FirstName.length < 4 || this.FirstName.length > 15) {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while singing up: check the length of first name" });
            this.FirstNameOK = false;
            this.ToolErrorFirstName = "*Check the length: it should be between 4 and 15 characters.";
            validFirstName = false;
        }

        else {
            var reg = new RegExp("[^a-zA-Z0-9_'-]");
            var containError = reg.test(this.FirstName);

            if (containError) {
                this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while singing up: unacceptable character in first name" });
                this.FirstNameOK = false;
                this.ToolErrorFirstName = "*Check the characters: use only letters, numbers and symbols: -,',_ .";
                validFirstName = false;
            }
        }

        //check last name
        if (this.LastName.length < 4 || this.LastName.length > 15) {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while singing up: check the length of last name" });
            this.LastNameOK = false;
            this.ToolErrorLastName = "*Check the length: it should be between 4 and 15 characters.";
            validLastName = false;
        }

        else {
            var reg = new RegExp("[^a-zA-Z0-9_'-]");
            var containError = reg.test(this.LastName);

            if (containError) {
                this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while singing up: unacceptable character in last name" });
                this.LastNameOK = false;
                this.ToolErrorLastName = "*Check the characters: use only letters, numbers and symbols: -,',_ .";
                validLastName = false;
            }
        }

        //check password
        if (this.Password.length < 6 || this.Password.length > 100) {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while singing up: check the length of password" });
            this.PasswordOK = false;
            this.ToolErrorPassword = "*Check the length: it should be between 8 and 100 characters.";
            validPassword = false;
        }

        else {
            var reg1 = new RegExp("[0-9]");
            var reg2 = new RegExp("[A-Z]");
            var reg3 = new RegExp("[a-z]");
            var containError = !reg1.test(this.Password);
            if (!containError) var containError = !reg2.test(this.Password);
            if (!containError) var containError = !reg3.test(this.Password);
            if (containError) {
                this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while singing up: must be at least one digit, one small letter and one capital letter in password" });
                this.PasswordOK = false;
                this.ToolErrorPassword = "*Invalid password: use at least one digit, one small letter and one capital letter.";
                validPassword = false;
            }

            else {
                if (this.Password != this.RepeatPassword) {
                    this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while singing up: make sure the repeated password is exactly the same as entered" });
                    this.RepeatPasswordOK = false;
                    this.ToolErrorPasswordRepeat = "*Repeat new password, make sure it is exactly the same as entered.";
                    validPassword = false;
                }
            }
        }

        //check email
        var reg = new RegExp("(\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,6})");
        var containError = !reg.test(this.Email);

        if (containError) {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while singing up: enter your real current email address" });
            this.EmailOK = false;
            this.ToolErrorEmail = "*Invalid email: enter your real current email address.";
            validEmail = false;
        }

        else {
            this._authService.userExist(this.Email).subscribe(data => {
                if (validFirstName && validLastName && validEmail && validPassword) {

                    let tempModel: ISingUpModel = { email: this.Email, firstName: this.FirstName, lastName: this.LastName, password: this.Password };
                    this._authService.signUp(tempModel).subscribe(data => {

                        this.Msgs.push({ severity: 'success', summary: 'Success', detail: "You have signed up successfully. Now you will be rerouted to log in. A letter was sent to your emai address, click the link in it to confirm email." });

                        setTimeout((router: Router) => {
                            this.router.navigate(['/login']);
                        }, 2500);
                    },
                        err => {
                            this.error = err;

                            this.Msgs.push({ severity: 'error', summary: 'Error', detail: err });
                        });
                };
            },
                err => {
                    this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while singing up: enter your real current email address" });
                    this.ToolErrorEmail = "*Invalid email: user with such email already exists.";
                    this.EmailOK = false;
                    validEmail = false;
                });    
            }
        }          
    }