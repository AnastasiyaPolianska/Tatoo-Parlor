import { Component, Input, OnInit, ViewEncapsulation}  from '@angular/core';
import { IProduct } from '../products/product';
import { CartService } from '../cart/cart.service';
import { Message } from 'primeng/primeng';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'all-products',
    templateUrl: './allProducts.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./allProducts.component.scss']
})
export class AllProductsComponent{
    @Input() public AllProducts: IProduct[];

    public PageTitle: string = 'Product List';
    public ImageWidth: number = 50;
    public ImageMargin: number = 2;
    public ListFilter: string;
    @Input() public ErrorMessage: string;
    @Input() public IsCart: boolean; 

    public BuyAllDisabled: boolean = false;
    public ClearCartDisabled: boolean = false;

    public Image = "Image";
    public Name = "Name:";
    public Description = "Description:";
    public Price = "Price:";
    public AmountLeft = "Amount Left:";
    public StarRating = "5 Star Rating:";
    public Quantity = "Quantity";
    public Filter = "Filter products by:";
    public Buy = "Buy all";
    public Remove = "Remove";
    public Delete = "Clear cart";

    public TitleRemove = "Click to remove product from cart";
    public TitleClear = "Click to clear the cart";
    public TitleBuy = "Click to buy all products in cart";
    public TitleDetails = "Click to find out more info about product";

    public CartToSend: number;

    public LabelTotalPrice: string = "Total price: ";
    public TotalPrice: number;
    public LabelTotalAmount: string = "Total amount of products: ";
    public TotalAmount: number;
    public Cancel: string = "Cancel";
    public Buying: boolean;

    public Header: string = "Confirm your action";
    public Content: string = "";

    public Msgs: Message[] = [];

    constructor(private _cartService: CartService, private modalService: NgbModal) { }

    /*Executes on initialisation*/
    ngOnInit(): void {
        if (this.IsCart) {
            this.CartToSend = 1;

            this._cartService.totalSum()
                .subscribe(sum => this.TotalPrice = sum);

            this._cartService.totalAmount()
                .subscribe(amount => this.TotalAmount = amount);
        }

        else this.CartToSend = 0;
    }

    /*Removing product from cart*/
    public RemoveProduct(productId : number): void {
        var idx = this.AllProducts.findIndex(x => x.id == productId);

        this.TotalAmount = this.TotalAmount - this.AllProducts[idx].amount;
        this.TotalPrice = this.TotalPrice - this.AllProducts[idx].price * this.AllProducts[idx].amount;

        this.AllProducts.splice(idx, 1);

        this.Msgs.push({ severity: 'error', summary: 'Success', detail: "Removed from cart." });

        this._cartService.deleteProduct(productId)
            .subscribe();
    }

    /*Buying all products from cart*/
    public BuyAll(): void {
        var len = this.AllProducts.length;

        this.AllProducts.splice(0, len);

        this.Msgs.push({ severity: 'success', summary: 'Success', detail: "Products bought" });

        this.TotalAmount = 0;
        this.TotalPrice = 0;

        this._cartService.buyAll()
            .subscribe();        
    }

    /*Clearing the cart*/
    public DeleteAll(): void {
        var len = this.AllProducts.length;

        this.AllProducts.splice(0, len);

        this.Msgs.push({ severity: 'success', summary: 'Success', detail: "Cart cleared" });

        this.TotalAmount = 0;
        this.TotalPrice = 0;

        this._cartService.deleteAll()
            .subscribe();
    }

    /*Increasing amount of product in cart*/
    public IncreasingAmount(product: IProduct): void {
        if (product.amount < product.amountLeft) {
            product.amount++;
            this.TotalAmount++;
            this.TotalPrice = this.TotalPrice + product.price;
        }
        if (product.amount) {
            this._cartService.changeAmount(product.id, product.amount)
                .subscribe();
        }
    }

    /*Decreasing amount of product in cart*/
    public DecreasingAmount(product: IProduct): void {
        if (product.amount > 1) {
            product.amount--;
            this.TotalAmount--;
            this.TotalPrice = this.TotalPrice - product.price;
        }
        if (product.amount) {
            this._cartService.changeAmount(product.id, product.amount)
                .subscribe();
        }
    }

    public ShowDialogByuAll(content) {
        this.Content = "Are you sure, you want to byu ";
        this.Content += this.TotalAmount;

        if (this.TotalAmount > 1) this.Content += " products ";
        else this.Content += " product ";

        this.Content += "for ";
        this.Content += this.TotalPrice;
        this.Content += "$ ?";

        this.Buying = true;

        this.modalService.open(content);
    }

    public HideDialogByuAll() {
        
    }

    public ShowDialogClear(content) {
        this.Content = "Are you sure you want to clear the cart?";

        this.Buying = false;

        this.modalService.open(content);
    }

    public HideDialogClear() {
        
    }
}