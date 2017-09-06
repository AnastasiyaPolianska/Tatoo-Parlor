import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
    public PageTitle: string = 'Tatooed youth';
    
    public ArticleTitle: string = 'About us...';
    public ArticleText: string= 'We are ready to offer you a lot of great tatoos made from individual scretches by our talented artists. Read more about "Tatooed youth" and get familiar with artists and their works ';

    public Shop: string = "online shop";
    public ThisPage: string = "this page";
    public Here: string = "here";
    public FAQ: string = "FAQ";
    public Questions: string = "feedback form";
    public Cabinet: string = "cabinet";
    public Cart: string = "shopping cart page";

    public StartwithTitle: string = 'Do not know what to start with?';
    public StartwithText: string[] = [
        'If you are new to a tatoo industry, first of all get familiar with our tatoo masters and the best of their works right ',
        ' If you are ready to start the tatooing process, you can choose your individual scratch or upload your own on ',
        ' Besides, you can buy some tatoo products in our ',
        ' All our contacts are available just ',
        ' Frequently asked questions are already answered for you in ',
        ', but if you have extra ones, welcome to our ',
        ' You personal info is saved and can be changed in personal ',
        ' and all purchases can be managed on your '];

    public ngOnInit(): void {
        window.scroll(0, 0);
    }
}