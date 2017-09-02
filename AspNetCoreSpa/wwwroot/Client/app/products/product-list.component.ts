import { Component, OnInit }  from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Message } from 'primeng/primeng';
import { AuthService } from '../shared/auth.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    public ErrorMessage ="";
    public Products: IProduct[];

    public isChanging = false;

    public ArticleTitle = "Product-list";
    public ArticleText = "You can buy different tatoo products on this page. Simply find the products you need using filters below and click on their names to look at product details.";

    public TitleProduct = "Add Product";

    public AddName: string = "Enter product name:";
    public PlaceHolderName: string = "Enter product name...";
    public ToolName: string = "*Use any letters, numbers and symbols: -,',_ . From 4 to 20 characters.";
    public ToolErrorName: string;
    public NameOk: boolean = true;

    public AddDescription: string = "Enter product description:";
    public PlaceHolderDescription: string = "Enter product description...";
    public ToolDescription: string = "*Use from 10 to 200 characters.";
    public ToolErrorDescription: string;
    public DescriptionOk: boolean = true;

    public AddPrice: string = "Choose product price:";
    public ProductPrice: string = "Product price: ";
    public TitleIncreasePrice: string = "Click to increase price";
    public TitleDecreasePrice: string = "Click to decrease price";

    public AddQuantity: string = "Choose product quantity:";
    public ProductQuantity: string = "Product quantity: ";
    public TitleIncreaseQuantity: string = "Click to increase quantity";
    public TitleDecreaseQuantity: string = "Click to decrease quantity";

    public AddUrl: string = "Enter product image url:";
    public PlaceHolderUrl: string = "Enter product image url...";
    public ToolUrl: string = "*Enter valid image url.";
    public ToolErrorUrl: string;
    public UrlOk: boolean = true;

    public Name: string = "";
    public Description: string = "";
    public Price: number = 1;
    public Quantity: number = 1;
    public Url: string = "";
    public idChanging: number;

    public Add: string = "Add";
    public TitleButtonAdd: string = "Click to add product to the list";

    public TitleCancel: string = "Click to clear all the fields";
    public Cancel: string = "Cancel";

    public Msgs: Message[] = [];

    constructor(private _productService: ProductService, private _authService: AuthService) {
    }

    /*Executes on initialisation of page*/
    ngOnInit(): void {
        this.Initializer();
    }

    public Initializer(): void {
        this._productService.getProducts()
            .subscribe(products => this.Products = products,
            error => this.ErrorMessage = <any>error);
    }

    public AddProduct(): void {
        this.NameOk = true;
        this.DescriptionOk = true;
        this.UrlOk = true;

        if (this.Name.length < 4 || this.Name.length > 20)
        {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while adding the product: check the length" });
            this.NameOk = false;
            this.ToolErrorName = "*Check the length: it should be between 4 and 20 characters.";                
        }
        else
        {
            var reg = new RegExp("[^a-zA-Z0-9_'-]");
            var containError = reg.test(this.Name);

            if (containError) {
                this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while adding the product: unacceptable character" });
                this.NameOk = false;
                this.ToolErrorName = "*Check the characters: use only letters, numbers and symbols: -,',_ .";
            }
        }

        if (this.Description.length < 10 || this.Description.length > 200) {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while adding the product: check the length" });
            this.DescriptionOk = false;
            this.ToolErrorDescription = "*Check the length: it should be between 10 and 200 characters.";
        }

        if (this.Url.length < 8) {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while adding the product: check the url" });
            this.UrlOk = false;
            this.ToolErrorUrl = "*Check the url: enter valid image url.";
        }
        else
        {
            var reg = new RegExp("^https?:\\/\\/");
            var EveryOk = reg.test(this.Url);

            if (!EveryOk)
            {
                this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while adding the product: check the url" });
                this.UrlOk = false;
                this.ToolErrorUrl = "*Check the url: enter valid image url.";
            }
        }

        if (this.NameOk && this.DescriptionOk && this.UrlOk) {

            if (!this.isChanging) {
                let tempModel: IProduct = { productName: this.Name, amountLeft: this.Quantity, price: this.Price, description: this.Description, starRating: 2.5, imageUrl: this.Url };

                this._productService.addProduct(tempModel).subscribe(data => {
                this.Initializer();
                this.Msgs.push({ severity: 'success', summary: 'Success', detail: "Product added successfully" });
                this.Name = "";
                this.Description = "";
                this.Price = 1;
                this.Quantity = 1;
                this.Url = "";
                })
            }

            else {
                let tempModel: IProduct = { id: this.idChanging, productName: this.Name, amountLeft: this.Quantity, price: this.Price, description: this.Description, imageUrl: this.Url };

                this._productService.changeProduct(tempModel).subscribe(data => {
                    this.Initializer();
                    this.Msgs.push({ severity: 'success', summary: 'Success', detail: "Product changed successfully" });
                    this.Name = "";
                    this.Description = "";
                    this.Price = 1;
                    this.Quantity = 1;
                    this.Url = "";
                })
            }         
        }
    }

    public DecreasePrice(): void{
        if (this.Price>1) this.Price--;
    }

    public IncreasePrice(): void{
        if (this.Price<10000) this.Price++;
    }

    public DecreaseQuantity(): void {
        if (this.Quantity > 1) this.Quantity--;
    }

    public IncreaseQuantity(): void {
        if (this.Quantity < 10000) this.Quantity++;
    }

    public StartChangeProduct(productId: number): void {
        this.isChanging = true;
        this.TitleCancel = "Click to cancel changing";
        this.TitleProduct = "Change Product";
        this.Add = "Change";
        this.idChanging = productId;

        var idx = this.Products.findIndex(x => x.id == productId);

        this.Name = this.Products[idx].productName;
        this.Description = this.Products[idx].description;
        this.Price = this.Products[idx].price;
        this.Quantity = this.Products[idx].amountLeft;
        this.Url = this.Products[idx].imageUrl;

        this.NameOk = true;
        this.DescriptionOk = true;
        this.UrlOk = true;        
    }

    public CancelClick(): void {
        if (this.isChanging)
        {
            this.isChanging = false;
            this.TitleCancel = "Click to clear all the fields";
            this.TitleProduct = "Add Product";
            this.Add = "Add";

            this.Name = "";
            this.Description = "";
            this.Price = 1;
            this.Quantity = 1;
            this.Url = "";

            this.NameOk = true;
            this.DescriptionOk = true;
            this.UrlOk = true;
        }
        else {
            this.Name = "";
            this.Description = "";
            this.Price = 1;
            this.Quantity = 1;
            this.Url = "";

            this.NameOk = true;
            this.DescriptionOk = true;
            this.UrlOk = true;
        }
    }
}
