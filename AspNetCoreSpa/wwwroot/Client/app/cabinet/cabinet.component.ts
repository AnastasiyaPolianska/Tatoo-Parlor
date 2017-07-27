import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent 
{
    constructor(private _authService: AuthService) { };

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

    public TitleChangeLastName: string = "Change last name";
    public LableChangeLastName: string = "Enter new last name: ";
    public PlaceHolderChangeLastName: string = "Enter new last name...";
    public ShowChangeLastName: boolean = false;
    public TitleLinkChangeLastName: string = "Click to change your last name";

    public TitleChangeEmail: string = "Change email";
    public LableChangeEmail: string = "Enter new email: ";
    public PlaceHolderChangeEmail: string = "Enter new email...";
    public ShowChangeEmail: boolean = false;
    public TitleLinkChangeEmail: string = "Click to change your email";

    public TitleChangePassword: string = "Change password";
    public LableChangePassword: string = "Enter new password: ";
    public PlaceHolderChangePassword: string = "Enter new password...";
    public ShowChangePassword: boolean = false;
    public TitleLinkChangePassword: string = "Click to change your password";
    public LableRepeatPassword: string = "Repeat new password: ";
    public PlaceHolderRepeatPassword: string = "Repeat new password...";

    public LableConfirmEmail: string = "Enter your password to confirm: ";
    public PlaceHolderConfirmEmail: string = "Enter your password to confirm...";

    public LableConfirmPassword: string = "Enter your old password to confirm: ";
    public PlaceHolderConfirmPassword: string = "Enter your old password to confirm...";

    public LableConfirmEvery: string = "Enter your old password to confirm: ";
    public PlaceHolderConfirmEvery: string = "Enter your old password to confirm...";

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
        }
        else {
            this.ChangeInfoFirstName = "Change info";
            this.TitleLinkChangeFirstName = "Click to change your first name";
        }
    }

    public ChangeFirstName() : void {
        this.FirstName = this.NewFirstName;
        this._authService.changeFirstName(this.NewFirstName).subscribe();

        this.Msgs.push({ severity: 'success', summary: 'Success', detail: "First name changed" });
;    }

    public ToggleChangeLastName(): void {
        this.ShowChangeLastName = !this.ShowChangeLastName;

        if (this.ShowChangeLastName) {
            this.ChangeInfoLastName = "Cancel";
            this.TitleLinkChangeLastName = "Click to cancel changing";
        }
        else {
            this.ChangeInfoLastName = "Change info";
            this.TitleLinkChangeLastName = "Click to change your last name";
        }
    }

    public ChangeLastName(): void {
        this.LastName = this.NewLastName;
        this._authService.changeLastName(this.NewLastName).subscribe();

        this.Msgs.push({ severity: 'success', summary: 'Success', detail: "Last name changed" });
    }

    public ToggleChangeEmail(): void {
        this.ShowChangeEmail = !this.ShowChangeEmail;

        if (this.ShowChangeEmail) {
            this.ChangeInfoEmail = "Cancel";
            this.TitleLinkChangeEmail = "Click to cancel changing";
        }
        else {
            this.ChangeInfoEmail = "Change info";
            this.TitleLinkChangeEmail = "Click to change your email";
        }
    }

    public ChangeEmail(): void {
        this.Email = this.NewEmail;
        this._authService.changeEmail(this.NewEmail, this.ConfirmEmail).subscribe();

        this.Msgs.push({ severity: 'success', summary: 'Success', detail: "Email changed" });
    }

    public ToggleChangePassword(): void {
        this.ShowChangePassword = !this.ShowChangePassword;

        if (this.ShowChangePassword) {
            this.ChangeInfoPassword = "Cancel";
            this.TitleLinkChangePassword = "Click to cancel changing";
        }
        else {
            this.ChangeInfoPassword = "Change password";
            this.TitleLinkChangePassword = "Click to change your password";
        }
    }

    public ChangePassword(): void {

    }

    public ToggleChangeEvery() : void{
        this.ShowChangeEvery = !this.ShowChangeEvery;

        if (this.ShowChangeEvery) {
            this.ChangeInfoEvery = "Cancel";
            this.TitleLinkChangeEvery = "Click to cancel changing";
        }
        else {
            this.ChangeInfoEvery = "Change all information";
            this.TitleLinkChangeEvery = "Click to change all information";
        }
    }

    public ChangeEvery(): void {

    }
}