import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';

@Component({
    templateUrl: './adminpage.component.html',
    styleUrls: ['./adminpage.component.scss']
})
export class AdminpageComponent 
{
    constructor(private _authService: AuthService, private _router: Router) { };

    public Maintitle: string = "Admin panel";
    public Subtitle: string = "You are free to make this place even better.";

    public ProductsLable: string = "Products";
    public TitleChangeProducts: string = "Click to switch to products page";
    public ChangeInfoProducts: string = "Change info about products";

    public QuestionsLable: string = "Questions";
    public TitleChangeQuestions: string = "Click to switch to questions page";
    public ChangeInfoQuestions: string = "Answer user questions";
    
    public ChangeProducts(): void {
        this._router.navigate(['\products']);
    }

    public AnswerQuestions(): void {
        this._router.navigate(['\questions']);
    }
}