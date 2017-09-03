import { Component, OnInit } from '@angular/core';

import { ScretchService } from './scretch.service';
import { IScretch } from './scretch';

@Component({
    templateUrl: './scretches.component.html',
    styleUrls: ['./scretches.component.scss']
})
export class ScretchesComponent implements OnInit{
    public ArticleTitle: string = 'Scretches...';
    public ArticleText: string = 'If you are ready to have a cool picture on your body, choose one scretch from below (just click on it!) or upload your own picture in a field at the bottom of this page and fill in the form to make an appointment. We will phone or email you in a couple of days after receiving your order. There is a name, price, size and short description of each model beneath the picture. Have fun!';

    public ErrorMessage = "";
    public Scretches: IScretch[];

    public ScretchNameLabel: string = "Scretch name: ";
    public ScretchDescriptionLabel: string = "Description: ";
    public ScretchPriceLabel: string = "Price: ";
    public ScretchSizeLabel: string = "Size: ";
    public ScretchName: any;
    public ScretchDescription: any;
    public ScretchPrice: any;
    public ScretchWidth: any;
    public ScretchHeight: any;

    public DescriptionNumber = 0;
    public IsFirst = true;
    public AllowMove = true;

    public PanelHeading: string = 'Fill in the form to book a scretch and make an appointment'
    public Choosed: string = 'Choosed: ';
    public Option: string;
    public Scretch: string = 'Scretch from gallery';
    public Picture: string = 'Your own picture';
    public LabelChoose: string = 'Choose one of the scretches:';
    public LabelUpload: string = 'Upload your own picture:';
    public ButtonName: string = 'Confirm';
    public DateOfAppointment: string = "Date of appointment: ";

    public SelectedName: any;
    public SelectedNameDescription: string;
    public ScretchNamePrice: number;
    public ScretchNameWidth: number;
    public ScretchNameHeight: number;
    public NotChoosed: string = "not choosed";
    public ChoosedFileName: string;

    public AddUrl: string = "Enter product image url:";
    public PlaceHolderUrl: string = "Enter product image url...";
    public ToolUrl: string = "*Enter valid image url.";
    public ToolErrorUrl: string;
    public UrlOk: boolean = true;
    public Url: string = "";

    public ScretchUrlLabel: string = "Url: ";
    public NotEntered: string = "not entered";

    public value: Date;
    public minimumDate: Date = new Date();
    public DateToShow: string = "";

    constructor(private _scretchService: ScretchService) {
    }

    /*Executes on initialisation of page*/
    ngOnInit(): void {
        window.scroll(0, 0);

        var day = this.minimumDate.getDate();
        var month = this.minimumDate.getMonth();
        var year = this.minimumDate.getFullYear();

        this.DateToShow = day.toString() + "/" + month.toString() + "/" + year.toString();

        this._scretchService.getScretches()
            .subscribe(scretches => this.Scretches = scretches,
            error => this.ErrorMessage = <any>error)       
    }

    isActive(url: string) {
        return url === (this.Scretches !== undefined ? this.Scretches[0].imageUrl : undefined)
    }

    Right(): any {
        if (this.AllowMove) {
            this.AllowMove = false;

            setTimeout(() => {
                this.AllowMove = true;
            }, 602);

            this.DescriptionNumber++;
            if (this.DescriptionNumber == this.Scretches.length) this.DescriptionNumber = 0;

            this.ScretchName = this.Scretches[this.DescriptionNumber].scretchName;
            this.ScretchDescription = this.Scretches[this.DescriptionNumber].description;
            this.ScretchPrice = this.Scretches[this.DescriptionNumber].price;
            this.ScretchWidth = this.Scretches[this.DescriptionNumber].width;
            this.ScretchHeight = this.Scretches[this.DescriptionNumber].height;
            this.IsFirst = false;
        }
    }

    Left(): any {
        if (this.AllowMove) {
            this.AllowMove = false;

            setTimeout(() => {
                this.AllowMove = true;
            }, 602)

            this.DescriptionNumber--;
            if (this.DescriptionNumber == -1) this.DescriptionNumber = this.Scretches.length - 1;

            this.ScretchName = this.Scretches[this.DescriptionNumber].scretchName;
            this.ScretchDescription = this.Scretches[this.DescriptionNumber].description;
            this.ScretchPrice = this.Scretches[this.DescriptionNumber].price;
            this.ScretchWidth = this.Scretches[this.DescriptionNumber].width;
            this.ScretchHeight = this.Scretches[this.DescriptionNumber].height;
            this.IsFirst = false;
        }
    }

    ChoosingScretch(): void {
        this.Option = 'Scretch from gallery';

        this.SelectedName = this.ScretchName;
        this.SelectedNameDescription = this.ScretchDescription;
        this.ScretchNamePrice = this.ScretchPrice;
        this.ScretchNameWidth = this.ScretchWidth;
        this.ScretchNameHeight = this.ScretchHeight;

        if (this.IsFirst) {
            this.SelectedName = this.Scretches[0].scretchName;
            this.SelectedNameDescription = this.Scretches[0].description
            this.ScretchNamePrice = this.Scretches[0].price;
            this.ScretchNameWidth = this.Scretches[0].width;
            this.ScretchNameHeight = this.Scretches[0].height;
        }
    }

    OnSelectionChange(): any {
        var temp = this.Scretches.find(x => x.scretchName == this.SelectedName);

        if (temp) {
            this.SelectedNameDescription = temp.description
            this.ScretchNamePrice = temp.price;
            this.ScretchNameWidth = temp.width;
            this.ScretchNameHeight = temp.height;
        }
    }

    SelectingNewDate(): void {
        var day = this.value.getDate();
        var month = this.value.getMonth();
        var year = this.value.getFullYear();

        this.DateToShow = day.toString() + "/" + month.toString() + "/" + year.toString();
    }

    SendScretch(): void {
        alert(this.DateToShow);
    }
}