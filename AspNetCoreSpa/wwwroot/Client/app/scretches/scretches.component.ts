import { Component } from '@angular/core';

@Component({
    templateUrl: './scretches.component.html',
    styleUrls: ['./scretches.component.css']
})
export class ScretchesComponent {
    public ArticleTitle: string = 'Scretches...';
    public ArticleText: string = 'If you are ready to have a cool picture on your body, choose one scretch from below or draw your own in a field at the bottom of this page and fill in the form to make an appointment. There are prices and short description of each model and you can see this characteristics for your picture, too. Have fun!';
    public FormTitle: string = 'Fill in the form to make an appointment';
    public LabelChoose: string = 'Choose one of the scretches:';
    public ButtonName: string = 'Confirm';
}