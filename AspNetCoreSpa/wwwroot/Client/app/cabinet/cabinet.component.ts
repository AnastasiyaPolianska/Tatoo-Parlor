import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';

@Component({
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent 
{
    constructor(private _authService: AuthService,
                private _router: Router) { };

    public Maintitle: string = 'My cabinet';
    public Subtitle: string = 'Feel yourself at home.';

    public FirstnameLabel: string = "First name: ";
    public LastnameLabel: string = "Last name: ";
    public EmailLabel: string = "Email: ";

    public ChangeInfoFirstName: string = "Change info";
    public ChangeInfoLastName: string = "Change info";
    public ChangeInfoEmail: string = "Change info";
    public ChangeInfoPassword: string = "Change password";
    public ChangeInfo: string = "Change info";
    public ChangeInfoEvery: string = "Change all info";

    public TitleChangeFirstName: string = "Change first name";
    public LableChangeFirstName: string = "Enter new first name: ";
    public PlaceHolderChangeFirstName: string = "Enter new first name...";
    public ShowChangeFirstName: boolean = false;
    public TitleLinkChangeFirstName: string = "Click to change your first name";
    public ToolFirstName: string = "*Use any letters, numbers and symbols: -,',_ . From 4 to 15 characters.";
    public FirstNameOK: boolean = true;
    public ToolErrorFirstName: string;

    public TitleChangeLastName: string = "Change last name";
    public LableChangeLastName: string = "Enter new last name: ";
    public PlaceHolderChangeLastName: string = "Enter new last name...";
    public ShowChangeLastName: boolean = false;
    public TitleLinkChangeLastName: string = "Click to change your last name";
    public ToolLastName: string = "*Use any letters, numbers and symbols: -,',_ . From 4 to 15 characters.";
    public ToolErrorLastName: string = "";
    public LastNameOK: boolean = true;

    public TitleChangeEmail: string = "Change email";
    public LableChangeEmail: string = "Enter new email: ";
    public PlaceHolderChangeEmail: string = "Enter new email...";
    public ShowChangeEmail: boolean = false;
    public TitleLinkChangeEmail: string = "Click to change your email";
    public ToolEmail: string = "*Enter your new email correctly.";
    public ToolErrorEmail: string = "";
    public EmailOK: boolean = true;

    public TitleChangePassword: string = "Change password";
    public LableChangePassword: string = "Enter new password: ";
    public PlaceHolderChangePassword: string = "Enter new password...";
    public ShowChangePassword: boolean = false;
    public TitleLinkChangePassword: string = "Click to change your password";
    public LableRepeatPassword: string = "Repeat new password: ";
    public PlaceHolderRepeatPassword: string = "Repeat new password...";
    public ToolPassword: string = "*Use any letters, numbers or symbols. Must be at least one digit, one small letter and one capital letter. From 8 to 100 characters.";
    public ToolErrorPassword: string = "";
    public ToolPasswordRepeat: string = "*Repeat new password, make sure it is exactly the same as entered.";
    public ToolErrorPasswordRepeat: string = "";
    public PasswordOK: boolean = true;
    public RepeatPasswordOK: boolean = true;

    public LableConfirmEmail: string = "Enter your password to confirm: ";
    public PlaceHolderConfirmEmail: string = "Enter your password to confirm...";
    public ToolErrorConfirmEmail: string;
    public ConfirmEmailOK: boolean = true;

    public LableConfirmPassword: string = "Enter your old password to confirm: ";
    public PlaceHolderConfirmPassword: string = "Enter your old password to confirm...";
    public ToolErrorConfirmPassword: string;
    public ConfirmPasswordOK: boolean = true;

    public LableConfirmEvery: string = "Enter your old password to confirm: ";
    public PlaceHolderConfirmEvery: string = "Enter your old password to confirm...";
    public ToolErrorConfirmEvery: string;
    public ConfirmEveryOK: boolean = true;

    public ShowChangeEvery: boolean = false;
    public TitleChangeEvery: string = "Change all information";   

    public TitleLinkChangeEvery: string = "Click to change all information";

    public Change: string = "Change";
    public Cancel: string = "Cancel";

    public TitleButtonChangeFirstName: string = "Click to change your first name";
    public TitleButtonChangeLastName: string = "Click to change your last name";
    public TitleButtonChangeEmail: string = "Click to change your email";
    public TitleButtonChangePassword: string = "Click to change your password";
    public TitleButtonChangeEvery: string = "Click to change all information";

    public FirstName: string;
    public LastName: string;
    public Email: string;

    public NewFirstName: string;
    public NewLastName: string;
    public NewEmail: string;
    public NewPassword: string;
    public RepeatPassword: string;

    public ConfirmEmail: string;
    public ConfirmPassword: string;
    public ConfirmEvery: string;

    public Msgs: Message[] = [];
    public error: string;

    /*Getting user info from database on server side*/
    public GetUser(): void {
        this._authService.getUser().subscribe(data => {
            this.Email = data.email;
            this.LastName = data.lastName;
            this.FirstName = data.firstName;
        })
    }

    /*Executes on initialisation of page*/
    public ngOnInit() {
        this.GetUser();
    }

    public ToggleChangeFirstName() : void{

        this.ShowChangeFirstName = !this.ShowChangeFirstName;

        if (this.ShowChangeFirstName) {

            this.ChangeInfoFirstName = "Cancel";
            this.TitleLinkChangeFirstName = "Click to cancel changing";

            this.NewFirstName = "";
            this.FirstNameOK = true;
            this.ShowChangeLastName = false;
            this.ChangeInfoLastName = "Change info";
            this.TitleLinkChangeLastName = "Click to change your last name";
            this.NewLastName = "";
            this.LastNameOK = true;
            this.ShowChangeEmail = false;
            this.ChangeInfoEmail = "Change info";
            this.TitleLinkChangeEmail = "Click to change your email";
            this.NewEmail = "";
            this.ConfirmEmail = "";
            this.EmailOK = true;
            this.ConfirmEmailOK = true;
            this.ShowChangePassword = false;
            this.ChangeInfoPassword = "Change password";
            this.TitleLinkChangePassword = "Click to change your password";
            this.NewPassword = "";
            this.RepeatPassword = "";
            this.ConfirmPassword = "";
            this.PasswordOK = true;
            this.ConfirmPasswordOK = true;
            this.ShowChangeEvery = false;
            this.ChangeInfoEvery = "Change all information";
            this.TitleLinkChangeEvery = "Click to change all information";
            this.ConfirmEveryOK = true;
        }
        else {
            this.ChangeInfoFirstName = "Change info";
            this.TitleLinkChangeFirstName = "Click to change your first name";
            this.NewFirstName = "";
            this.FirstNameOK = true;
        }
    }

    public ChangeFirstName(): void {
        this.FirstNameOK = true;

        if (this.NewFirstName.length >= 4 && this.NewFirstName.length <= 15)
        {
            var reg = new RegExp("[^a-zA-Z0-9_'-]");
            var containError = reg.test(this.NewFirstName);

            if (!containError)
            {
                this.FirstName = this.NewFirstName;
                this.FirstNameOK = true;

                this._authService.changeFirstName(this.NewFirstName).subscribe();

                this.Msgs.push({ severity: 'success', summary: 'Success', detail: "First name changed" });
            }
            else
            {
                this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the first name: unacceptable character" });
                this.FirstNameOK = false;
                this.ToolErrorFirstName = "*Check the characters: use only letters, numbers and symbols: -,',_ .";

            }
        }
        else
        {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the first name: check the length" });
            this.FirstNameOK = false;
            this.ToolErrorFirstName = "*Check the length: it should be between 4 and 15 characters."; 
        }
    }

    public ToggleChangeLastName(): void {
        this.ShowChangeLastName = !this.ShowChangeLastName;

        if (this.ShowChangeLastName) {
            this.ChangeInfoLastName = "Cancel";
            this.TitleLinkChangeLastName = "Click to cancel changing";

            this.ShowChangeFirstName = false;
            this.ChangeInfoFirstName = "Change info";
            this.TitleLinkChangeFirstName = "Click to change your first name";
            this.NewFirstName = "";
            this.FirstNameOK = true;
            this.NewLastName = "";
            this.LastNameOK = true;
            this.ShowChangeEmail = false;
            this.ChangeInfoEmail = "Change info";
            this.TitleLinkChangeEmail = "Click to change your email";
            this.NewEmail = "";
            this.ConfirmEmail = "";
            this.EmailOK = true;
            this.ConfirmEmailOK = true;
            this.ShowChangePassword = false;
            this.ChangeInfoPassword = "Change password";
            this.TitleLinkChangePassword = "Click to change your password";
            this.NewPassword = "";
            this.RepeatPassword = "";
            this.ConfirmPassword = "";
            this.PasswordOK = true;
            this.ConfirmPasswordOK = true;
            this.ShowChangeEvery = false;
            this.ChangeInfoEvery = "Change all information";
            this.TitleLinkChangeEvery = "Click to change all information";
            this.ConfirmEveryOK = true;
        }
        else {
            this.ChangeInfoLastName = "Change info";
            this.TitleLinkChangeLastName = "Click to change your last name";
            this.NewLastName = "";
            this.LastNameOK = true;
        }
    }

    public ChangeLastName(): void {
        this.LastNameOK = true;

        if (this.NewLastName.length >= 4 && this.NewLastName.length <= 15) {
            var reg = new RegExp("[^a-zA-Z0-9_'-]");
            var containError = reg.test(this.NewLastName);

            if (!containError) {
                this.LastName = this.NewLastName;
                this.LastNameOK = true;

                this._authService.changeLastName(this.NewLastName).subscribe();

                this.Msgs.push({ severity: 'success', summary: 'Success', detail: "Last name changed" });
            }
            else {
                this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the last name: unacceptable character" });
                this.LastNameOK = false;
                this.ToolErrorLastName = "*Check the characters: use only letters, numbers and symbols: -,',_ .";

            }
        }
        else {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the last name: check the length" });
            this.LastNameOK = false;
            this.ToolErrorLastName = "*Check the length: it should be between 4 and 15 characters.";
        }
    }

    public ToggleChangeEmail(): void {
        this.ShowChangeEmail = !this.ShowChangeEmail;

        if (this.ShowChangeEmail) {
            this.ChangeInfoEmail = "Cancel";
            this.TitleLinkChangeEmail = "Click to cancel changing";

            this.ShowChangeFirstName = false;
            this.ChangeInfoFirstName = "Change info";
            this.TitleLinkChangeFirstName = "Click to change your first name";
            this.NewFirstName = "";
            this.FirstNameOK = true;
            this.ShowChangeLastName = false;
            this.ChangeInfoLastName = "Change info";
            this.TitleLinkChangeLastName = "Click to change your last name";
            this.NewLastName = "";
            this.LastNameOK = true;
            this.NewEmail = "";
            this.ConfirmEmail = "";
            this.EmailOK = true;
            this.ConfirmEmailOK = true;
            this.ShowChangePassword = false;
            this.ChangeInfoPassword = "Change password";
            this.TitleLinkChangePassword = "Click to change your password";
            this.NewPassword = "";
            this.RepeatPassword = "";
            this.ConfirmPassword = "";
            this.PasswordOK = true;
            this.ConfirmPasswordOK = true;
            this.ShowChangeEvery = false;
            this.ChangeInfoEvery = "Change all information";
            this.TitleLinkChangeEvery = "Click to change all information";
            this.ConfirmEveryOK = true;
        }
        else {
            this.ChangeInfoEmail = "Change info";
            this.TitleLinkChangeEmail = "Click to change your email";
            this.NewEmail = "";
            this.ConfirmEmail = "";
            this.EmailOK = true;
            this.ConfirmEmailOK = true;
        }
    }

    public ChangeEmail(): void {
        this.EmailOK = true;
        this.ConfirmEmailOK = true;

        var reg = new RegExp("(\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,6})");
        var containError = !reg.test(this.NewEmail);

        if (!containError) {

            this._authService.changeEmail(this.NewEmail, this.ConfirmEmail).subscribe(data => {
                var changeEmail = data;
                if (changeEmail == "good") {
                    this.Email = this.NewEmail;
                    this.Msgs.push({ severity: 'success', summary: 'Success', detail: "Email changed. Now you will be rerouted to log in." });

                    setTimeout((router: Router) => {
                        this._authService.logOut();
                        this._router.navigate(['/login']);
                    }, 2500);
                }
                else {
                    this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the email: enter your current password correctly" });
                    this.EmailOK = false;
                    this.ToolErrorEmail = "*Invalid current password: enter your current password correctly.";
                }
            },
                err => {

                    this.error = err;

                    if (this.error == "Error while changing the email: enter your current password correctly") {
                        this.ToolErrorConfirmEmail = "*Invalid current password: enter your current password correctly.";
                        this.ConfirmEmailOK = false;
                    }

                    if (this.error == "The password field is required.") {
                        this.error = "Error while changing the email: enter your current password correctly"
                        this.ToolErrorConfirmEmail = "*Invalid current password: enter your current password correctly.";
                        this.ConfirmEmailOK = false;
                    }           

                    if (this.error == "Error while changing the email: enter your real current email address") {
                        this.ToolErrorEmail = "*Invalid email: enter your real current email address.";
                        this.EmailOK = false;
                    }

                    if (this.error == "Error while changing the email: user with such email already exists") {
                        this.ToolErrorEmail = "*Invalid email: user with such email already exists.";
                        this.EmailOK = false;
                    }

                    this.Msgs.push({ severity: 'error', summary: 'Error', detail: this.error }); 
                });
        }
        else {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the email: enter your real current email address" });
            this.EmailOK = false;
            this.ToolErrorEmail = "*Invalid email: enter your real current email address.";
        }
    }

    public ToggleChangePassword(): void {
        this.ShowChangePassword = !this.ShowChangePassword;

        if (this.ShowChangePassword) {
            this.ChangeInfoPassword = "Cancel";
            this.TitleLinkChangePassword = "Click to cancel changing";

            this.ShowChangeFirstName = false;
            this.ChangeInfoFirstName = "Change info";
            this.TitleLinkChangeFirstName = "Click to change your first name";
            this.NewFirstName = "";
            this.FirstNameOK = true;
            this.ShowChangeLastName = false;
            this.ChangeInfoLastName = "Change info";
            this.TitleLinkChangeLastName = "Click to change your last name";
            this.NewLastName = "";
            this.LastNameOK = true;
            this.ShowChangeEmail = false;
            this.ChangeInfoEmail = "Change info";
            this.TitleLinkChangeEmail = "Click to change your email";
            this.NewEmail = "";
            this.ConfirmEmail = "";
            this.EmailOK = true;
            this.ConfirmEmailOK = true;
            this.NewPassword = "";
            this.RepeatPassword = "";
            this.ConfirmPassword = "";
            this.PasswordOK = true;
            this.ConfirmPasswordOK = true;
            this.ShowChangeEvery = false;
            this.ChangeInfoEvery = "Change all information";
            this.TitleLinkChangeEvery = "Click to change all information";
            this.ConfirmEveryOK = true;
        }
        else {
            this.ChangeInfoPassword = "Change password";
            this.TitleLinkChangePassword = "Click to change your password";
            this.NewPassword = "";
            this.RepeatPassword = "";
            this.ConfirmPassword = "";
            this.PasswordOK = true;
            this.ConfirmPasswordOK = true;
        }
    }

    public ChangePassword(): void {
        this.PasswordOK = true;
        this.ConfirmPasswordOK = true;
        this.RepeatPasswordOK = true;

        if (this.NewPassword.length < 6 || this.NewPassword.length > 100)
        {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the password: check the length" });
            this.PasswordOK = false;
            this.ToolErrorPassword = "*Check the length: it should be between 6 and 100 characters.";
        }
        else
        {
            var reg1 = new RegExp("[0-9]");
            var reg2 = new RegExp("[A-Z]");
            var reg3 = new RegExp("[a-z]");
            var containError = !reg1.test(this.NewPassword);
            if (!containError) var containError = !reg2.test(this.NewPassword);
            if (!containError) var containError = !reg3.test(this.NewPassword);

            if (!containError) {
                if (this.NewPassword != this.RepeatPassword)
                {
                    this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the password: make sure the repeated password is exactly the same as entered" });
                    this.RepeatPasswordOK = false;
                    this.ToolErrorPasswordRepeat = "*Repeat new password, make sure it is exactly the same as entered.";
                }
                else {
                    this._authService.changePassword(this.NewPassword, this.ConfirmPassword).subscribe(data => {
                    var changePassword = data;
                    if (changePassword == "good") {
                        this.Msgs.push({ severity: 'success', summary: 'Success', detail: "Password changed. Now you will be rerouted to log in." });

                        setTimeout((router: Router) => {
                            this._authService.logOut();
                            this._router.navigate(['/login']);
                        }, 2500);
                    }
                    else {
                        this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the password: enter your current password correctly" });
                        this.PasswordOK = false;
                        this.ToolErrorPassword = "*Invalid current password: enter your current password correctly.";
                    }
                    },
                        err => {

                        this.error = err;

                        if (this.error == "Error while changing the password: enter your current password correctly") {
                            this.ToolErrorConfirmPassword = "*Invalid current password: enter your current password correctly.";
                            this.ConfirmPasswordOK = false;
                        }

                        if (this.error == "The password field is required.") {
                            this.error = "Error while changing the password: enter your current password correctly"
                            this.ToolErrorConfirmPassword = "*Invalid current password: enter your current password correctly.";
                            this.ConfirmPasswordOK = false;
                        }

                        if (this.error == "Error while changing the password: check the length") {
                            this.ToolErrorPassword = "*Check the length: it should be between 8 and 100 characters.";
                            this.PasswordOK = false;
                        }

                        this.Msgs.push({ severity: 'error', summary: 'Error', detail: this.error });
                    });
                }
            }
            else {
                this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the password: must be at least one digit, one small letter and one capital letter" });
                this.PasswordOK = false;
                this.ToolErrorPassword = "*Invalid password: use at least one digit, one small letter and one capital letter.";
            }
        }
    }

    public ToggleChangeEvery() : void{
        this.ShowChangeEvery = !this.ShowChangeEvery;

        if (this.ShowChangeEvery) {
            this.ChangeInfoEvery = "Cancel";
            this.TitleLinkChangeEvery = "Click to cancel changing";

            this.ShowChangeFirstName = false;
            this.ChangeInfoFirstName = "Change info";
            this.TitleLinkChangeFirstName = "Click to change your first name";
            this.NewFirstName = "";
            this.FirstNameOK = true;
            this.ShowChangeLastName = false;
            this.ChangeInfoLastName = "Change info";
            this.TitleLinkChangeLastName = "Click to change your last name";
            this.NewLastName = "";
            this.LastNameOK = true;
            this.ShowChangeEmail = false;
            this.ChangeInfoEmail = "Change info";
            this.TitleLinkChangeEmail = "Click to change your email";
            this.NewEmail = "";
            this.ConfirmEmail = "";
            this.EmailOK = true;
            this.ConfirmEmailOK = true;
            this.ShowChangePassword = false;
            this.ChangeInfoPassword = "Change password";
            this.TitleLinkChangePassword = "Click to change your password";
            this.NewPassword = "";
            this.RepeatPassword = "";
            this.ConfirmPassword = "";
            this.PasswordOK = true;
            this.ConfirmPasswordOK = true;
            this.ConfirmEveryOK = true;
        }
        else {
            this.ChangeInfoEvery = "Change all information";
            this.TitleLinkChangeEvery = "Click to change all information";
            this.NewFirstName = "";
            this.NewLastName = "";
            this.NewEmail = "";
            this.NewPassword = "";
            this.RepeatPassword = "";
            this.ConfirmEvery = "";
            this.FirstNameOK = true;
            this.LastNameOK = true;
            this.EmailOK = true;
            this.PasswordOK = true;
            this.ConfirmEveryOK = true;
        }
    }

    public ChangeEvery(): void {

        var toSaveFirstName = this.FirstName;
        var toSaveLastName = this.LastName;

        this.FirstNameOK = true;
        this.LastNameOK = true;
        this.EmailOK = true;
        this.ConfirmEveryOK = true;
        this.PasswordOK = true;
        this.RepeatPasswordOK = true;

        var validFirstName = true;
        var validLastName = true;
        var validEmail = true;
        var validPassword = true;

        //check first name
        if (this.NewFirstName.length < 4 || this.NewFirstName.length > 15) {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the first name: check the length" });
            this.FirstNameOK = false;
            this.ToolErrorFirstName = "*Check the length: it should be between 4 and 15 characters.";
            validFirstName = false;
        }

        else {
            var reg = new RegExp("[^a-zA-Z0-9_'-]");
            var containError = reg.test(this.NewFirstName);

            if (containError) {
                this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the first name: unacceptable character" });
                this.FirstNameOK = false;
                this.ToolErrorFirstName = "*Check the characters: use only letters, numbers and symbols: -,',_ .";
                validFirstName = false;
            }
        }

        //check last name
        if (this.NewLastName.length < 4 || this.NewLastName.length > 15) {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the last name: check the length" });
            this.LastNameOK = false;
            this.ToolErrorLastName = "*Check the length: it should be between 4 and 15 characters.";
            validLastName = false;
        }

        else {
            var reg = new RegExp("[^a-zA-Z0-9_'-]");
            var containError = reg.test(this.NewLastName);

            if (containError) {
                this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the last name: unacceptable character" });
                this.LastNameOK = false;
                this.ToolErrorLastName = "*Check the characters: use only letters, numbers and symbols: -,',_ .";
                validLastName = false;
            }
        }

        //check password
        if (this.NewPassword.length < 6 || this.NewPassword.length > 100) {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the password: check the length" });
            this.PasswordOK = false;
            this.ToolErrorPassword = "*Check the length: it should be between 6 and 100 characters.";
            validPassword = false;
        }

        else {
            var reg1 = new RegExp("[0-9]");
            var reg2 = new RegExp("[A-Z]");
            var reg3 = new RegExp("[a-z]");
            var containError = !reg1.test(this.NewPassword);
            if (!containError) var containError = !reg2.test(this.NewPassword);
            if (!containError) var containError = !reg3.test(this.NewPassword);
            if (containError) {
                this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the password: must be at least one digit, one small letter and one capital letter" });
                this.PasswordOK = false;
                this.ToolErrorPassword = "*Invalid password: use at least one digit, one small letter and one capital letter.";
                validPassword = false;
            }

            else {
                if (this.NewPassword != this.RepeatPassword) {
                    this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the password: make sure the repeated password is exactly the same as entered" });
                    this.RepeatPasswordOK = false;
                    this.ToolErrorPasswordRepeat = "*Repeat new password, make sure it is exactly the same as entered.";
                    validPassword = false;
                }
            }
        }

        //check email
        var reg = new RegExp("(\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,6})");
        var containError = !reg.test(this.NewEmail);

        if (containError) {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the email: enter your real current email address" });
            this.EmailOK = false;
            this.ToolErrorEmail = "*Invalid email: enter your real current email address.";
            validEmail = false;
        }

        else {
            this._authService.userExist(this.NewEmail).subscribe(data => {
                if (validFirstName && validLastName && validEmail && validPassword) 
                {
                    this.FirstNameOK = true;
                    this.LastNameOK = true;
                    this.EmailOK = true;

                    this._authService.changeFirstName(this.NewFirstName).subscribe(data => {

                        this._authService.changeLastName(this.NewLastName).subscribe(data => {

                            this._authService.changeEmail(this.NewEmail, this.ConfirmEvery).subscribe(data => {

                                var changeEmail = data;
                                if (changeEmail == "good") {

                                    this._authService.changePassword(this.NewPassword, this.ConfirmEvery, this.NewEmail).subscribe(data => {
                                        var changePassword = data;
                                        if (changePassword == "good") {

                                            this.Msgs.push({ severity: 'success', summary: 'Success', detail: "Everything changed. Now you will be rerouted to log in." });
                                            this.FirstName = this.NewFirstName;
                                            this.LastName = this.NewLastName;
                                            this.Email = this.NewEmail;

                                            setTimeout((router: Router) => {
                                                this._authService.logOut();
                                                this._router.navigate(['/login']);
                                            }, 2500);
                                        }
                                        else {
                                            //in case of error change back
                                            this._authService.changeFirstName(toSaveFirstName).subscribe(data => {
                                                this._authService.changeLastName(toSaveLastName).subscribe(data => { });
                                            });

                                            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the password: enter your current password correctly" });
                                            this.PasswordOK = false;
                                            this.ToolErrorPassword = "*Invalid current password: enter your current password correctly.";
                                        }
                                    },
                                        err => {

                                            //in case of error change back
                                            this._authService.changeFirstName(toSaveFirstName).subscribe(data => {
                                                this._authService.changeLastName(toSaveLastName).subscribe(data => { });
                                            });

                                            this.error = err;

                                            if (this.error == "Error while changing the password: enter your current password correctly") {
                                                this.error = "Error while changing: enter your current password correctly";
                                                this.ToolErrorConfirmPassword = "*Invalid current password: enter your current password correctly.";
                                                this.ConfirmEveryOK = false;
                                            }

                                            if (this.error == "The password field is required.") {
                                                this.error = "Error while changing: enter your current password correctly";
                                                this.ToolErrorConfirmPassword = "*Invalid current password: enter your current password correctly.";
                                                this.ConfirmEveryOK = false;
                                            }

                                            if (this.error == "Error while changing the password: check the length") {
                                                this.ToolErrorPassword = "*Check the length: it should be between 8 and 100 characters.";
                                                this.PasswordOK = false;
                                            }

                                            this.Msgs.push({ severity: 'error', summary: 'Error', detail: this.error });
                                        });            
                                }
                                else {
                                    this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the email: enter your current password correctly" });
                                    this.EmailOK = false;
                                    this.ToolErrorEmail = "*Invalid current password: enter your current password correctly.";

                                    //in case of error change back
                                    this._authService.changeFirstName(toSaveFirstName).subscribe(data => {
                                        this._authService.changeLastName(toSaveLastName).subscribe(data => { });
                                    });
                                }
                            },
                                err => {

                                    //in case of error change back
                                    this._authService.changeFirstName(toSaveFirstName).subscribe(data => {
                                        this._authService.changeLastName(toSaveLastName).subscribe(data => { });
                                    });

                                    this.error = err;

                                    if (this.error == "Error while changing the email: enter your current password correctly") {
                                        this.error = "Error while changing: enter your current password correctly";
                                        this.ToolErrorConfirmEvery = "*Invalid current password: enter your current password correctly.";
                                        this.ConfirmEveryOK = false;
                                    }

                                    if (this.error == "The password field is required.") {
                                        this.error = "Error while changing: enter your current password correctly"
                                        this.ToolErrorConfirmEvery = "*Invalid current password: enter your current password correctly.";
                                        this.ConfirmEveryOK = false;
                                    }

                                    if (this.error == "Error while changing the email: enter your real current email address") {
                                        this.ToolErrorEmail = "*Invalid email: enter your real current email address.";
                                        this.EmailOK = false;
                                    }

                                    if (this.error == "Error while changing the email: user with such email already exists") {
                                        this.ToolErrorEmail = "*Invalid email: user with such email already exists.";
                                        this.EmailOK = false;
                                    }

                                    this.Msgs.push({ severity: 'error', summary: 'Error', detail: this.error });
                                });
                        });
                    }
                    );
                }        
            },
                err => {
                    this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the email: enter your real current email address" });
                    this.ToolErrorEmail = "*Invalid email: user with such email already exists.";
                    this.EmailOK = false;
                    validEmail = false;
                })           
        }        
    }
}