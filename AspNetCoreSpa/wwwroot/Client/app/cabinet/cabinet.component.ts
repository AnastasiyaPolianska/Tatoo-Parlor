﻿import { Component } from '@angular/core';
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
    public ToolPassword: string = "*Use any letters, numbers or symbols. Must be at least one lowercase letter, one uppercase letter and one number. From 8 to 15 characters.";
    public ToolPasswordRepeat: string = "*Repeat new password, make sure it is exactly the same as entered.";
    public PasswordOK: boolean = true;
    public RepeatPasswordOK: boolean = true;

    public LableConfirmEmail: string = "Enter your password to confirm: ";
    public PlaceHolderConfirmEmail: string = "Enter your password to confirm...";
    public ConfirmEmailOK: boolean = true;

    public LableConfirmPassword: string = "Enter your old password to confirm: ";
    public PlaceHolderConfirmPassword: string = "Enter your old password to confirm...";
    public ConfirmPasswordOK: boolean = true;

    public LableConfirmEvery: string = "Enter your old password to confirm: ";
    public PlaceHolderConfirmEvery: string = "Enter your old password to confirm...";
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
            this.ToolErrorFirstName = "Check the length: it should be between 4 and 15 characters."; 
        }
;    }

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
            this.ToolErrorLastName = "Check the length: it should be between 4 and 15 characters.";
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
        var reg = new RegExp("(\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,6})");
        var containError = !reg.test(this.NewEmail);

        if (!containError) {

            this._authService.changeEmail(this.NewEmail, this.ConfirmEmail).subscribe(data => {
                var changeEmail = data;
                if (changeEmail != "") {
                    this.Email = this.NewEmail;
                    this.Msgs.push({ severity: 'success', summary: 'Success', detail: "Email changed" });

                    this._authService.logOut();
                    this._router.navigate(['/login']);
                }
                else {
                    this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the email: enter your current password correctly" });
                    this.EmailOK = false;
                    this.ToolErrorEmail = "Invalid email: enter your current password correctly";
                }
            });
        }
        else {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while changing the email: enter your real current email address" });
            this.EmailOK = false;
            this.ToolErrorEmail = "Invalid email: enter your real current email address";
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

    }
}