import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';

import { ScretchService } from './scretch.service';
import { IScretch } from './scretch';

@Component({
    templateUrl: './scretches.component.html',
    styleUrls: ['./scretches.component.scss']
})
export class ScretchesComponent implements OnInit{

    constructor(private router: Router, private _scretchService: ScretchService) { };

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
    public ScretchId: any;

    public DescriptionNumber = 0;
    public IsFirst = true;
    public AllowMove = true;

    public PanelHeading: string = 'Fill in the form to book a scretch and make an appointment'
    public Choosed: string = 'Choosed: ';
    public Option: string = "";
    public Scretch: string = 'Scretch from gallery';
    public Picture: string = 'Your own picture';
    public LabelChoose: string = 'Choose one of the scretches:';
    public LabelUpload: string = 'Upload your own picture:';
    public ButtonName: string = 'Send';
    public DateOfAppointment: string = "Date of appointment: ";

    public SelectedName: any;
    public SelectedNameDescription: string;
    public ScretchNamePrice: number;
    public ScretchNameWidth: number;
    public ScretchNameHeight: number;
    public ScretchNameId: any;
    public NotChoosed: string = "not choosed";
    public ChoosedFileName: string;

    public AddUrl: string = "Enter scretch image url:";
    public PlaceHolderUrl: string = "Enter scretch image url...";
    public ToolUrl: string = "*Enter valid image url.";
    public ToolErrorUrl: string;
    public UrlOk: boolean = true;
    public Url: string = "";

    public ScretchUrlLabel: string = "Url: ";
    public NotEntered: string = "not entered";

    public value: Date;
    public minimumDate: Date = new Date();
    public DateToShow: string = "";

    public TatooSize: string = "Tatoo size: ";

    public WidthName: string = "Tatoo width: ";
    public Width: number = 1;
    public TitleIncreaseWidth: string = "Click to increase width";
    public TitleDecreaseWidth: string = "Click to decrease width";

    public HeightName: string = "Tatoo height: ";
    public Height: number = 1;
    public TitleIncreaseHeight: string = "Click to increase height";
    public TitleDecreaseHeight: string = "Click to decrease height";

    public AddDescription: string = "Enter your message to master here (optional): ";
    public PlaceHolderDescription: string = "Enter your message to master...";
    public ToolDescription: string = "*Use up to 200 characters.";
    public ToolErrorDescription: string;
    public DescriptionOk: boolean = true;
    public Description: string = "";

    public PriceName: string = "Tatoo price: ";
    public TitleSend: string = "Click to choose this scretch";

    public Msgs: Message[] = [];

    /*Executes on initialisation of page*/
    ngOnInit(): void {
        window.scroll(0, 0);

        this.value = this.minimumDate;

        var day = this.minimumDate.getDate();
        var month = this.minimumDate.getMonth();
        var year = this.minimumDate.getFullYear();

        this.DateToShow = year.toString() + "-" + month.toString() + "-" + day.toString();

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
            this.ScretchId = this.Scretches[this.DescriptionNumber].id;
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
            this.ScretchId = this.Scretches[this.DescriptionNumber].id;
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
        this.ScretchNameId = this.ScretchId;

        if (this.IsFirst) {
            this.SelectedName = this.Scretches[0].scretchName;
            this.SelectedNameDescription = this.Scretches[0].description
            this.ScretchNamePrice = this.Scretches[0].price;
            this.ScretchNameWidth = this.Scretches[0].width;
            this.ScretchNameHeight = this.Scretches[0].height;
            this.ScretchNameId = this.Scretches[0].id;
        }
    }

    OnSelectionChange(): any {
        var temp = this.Scretches.find(x => x.scretchName == this.SelectedName);

        if (temp) {
            this.SelectedNameDescription = temp.description
            this.ScretchNamePrice = temp.price;
            this.ScretchNameWidth = temp.width;
            this.ScretchNameHeight = temp.height;
            this.ScretchNameId = temp.id;
        }
    }

    SelectingNewDate(): void {
        var day = this.value.getDate();
        var month = this.value.getMonth();
        var year = this.value.getFullYear();

        this.DateToShow = year.toString() + "-" + month.toString() + "-" + day.toString();
    }

    SendScretch(): void {
        this.UrlOk = true;
        this.DescriptionOk = true;

        if (this.Option == 'Your own picture')
        {
            if (this.Url.length < 8) {
                this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while sending your own picture: check the url" });
                this.UrlOk = false;
                this.ToolErrorUrl = "*Check the url: enter valid image url.";
            }
            else {
                var reg = new RegExp("^https?:\\/\\/");
                var EveryOk = reg.test(this.Url);

                if (!EveryOk) {
                    this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while sending your own picture: check the url" });
                    this.UrlOk = false;
                    this.ToolErrorUrl = "*Check the url: enter valid image url.";
                }
            }

            if (this.Description.length > 200) {
                this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while adding a message: check the length" });
                this.DescriptionOk = false;
                this.ToolErrorDescription = "*Check the length: it should be up to 200 characters.";
            }

            if (this.UrlOk && this.DescriptionOk)
            {
                var temp = this.Height * this.Width;

                let tempModel: IScretch = { scretchName: "User scretch", price: temp, width: this.Width, height: this.Height, description: this.Description, imageUrl: this.Url, date: this.value, busy: true };
                this._scretchService.addScretch(tempModel).subscribe(data => {
                    this.Msgs.push({ severity: 'success', summary: 'Success', detail: "You have loaded the scretch successfully. Now you will be rerouted to your cabinet, where you can change details of appointment" });

                    setTimeout((router: Router) => {
                        this.router.navigate(['/cabinet'])
                    }, 2000);
                });
            }
        }       

        if (this.Option == 'Scretch from gallery') {
            if (!this.SelectedName) {
                this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while choosing the scretch: choose one scretch from the list or click on it in gallery" });
            }

            else {
                let tempModel: IScretch = { id: this.ScretchNameId, scretchName: this.SelectedName, date: this.value, busy: true };
                this._scretchService.setUserId(tempModel).subscribe(data => {
                    this.Msgs.push({ severity: 'success', summary: 'Success', detail: "You have choosed the scretch successfully. Now you will be rerouted to your cabinet, where you can change details of appointment" });

                    setTimeout((router: Router) => {
                        this.router.navigate(['/cabinet'])
                    }, 2000);
                }                    
                );
            }
        }

        if (this.Option=="")
        {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while choosing the scretch: choose option first" });
        }
    }

    DecreaseHeight(): void {
        this.Height--;
    }

    IncreaseHeight(): void {
        this.Height++;
    }

    DecreaseWidth(): void {
        this.Width--;
    }

    IncreaseWidth(): void {
        this.Width++;
    }
}