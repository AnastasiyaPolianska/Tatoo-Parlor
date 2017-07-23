import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';

import { Subscription }   from 'rxjs/Subscription';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { CartService } from '../cart/cart.service';

@Component({
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    public PageTitle: string = 'Product Detail';
    public Product: IProduct;
    public ErrorMessage: string;
    public Back = "Back";
    public AddToCart = "Add to cart"

    public Name = "Name:";
    public Description = "Description:";
    public Price = "Price:";
    public AmountLeft = "Amount Left:";
    public StarRating = "5 Star Rating:";
    public Id: number;

    public IsInCart: boolean;
    public Remove = "Remove from cart";

    public isCart: number;

    private sub: Subscription;

    public Msgs: Message[] = [];

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _productService: ProductService,
                private _cartService: CartService) {
    }

     /*Executes on initialisation of page*/
    ngOnInit(): void {
        this.sub = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
                this.Id = id;
                this.isCart = params['cartToSend'];
            });

        this._cartService.productIsInCart(this.Id).subscribe(
            isInCart => this.IsInCart = isInCart);
    }

     /*Executes on leaving the page*/
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    /*Getting the product you need*/
    getProduct(id: number) {
        this._productService.getProduct(id).subscribe(
            product => this.Product = product,
            error => this.ErrorMessage = <any>error);
    }

     /*Executes on pressing the 'back' button*/
    onBack(): void {
        if (this.isCart == 0) this._router.navigate(['/products']);
        if (this.isCart == 1) this._router.navigate(['/cart']);
    }

     /*Executes on clicking the 'rating'*/
    onRatingClicked(message: string): void {
        
    }

    /*Adding product to your cart*/
    addToCart(): void {
        this._cartService.addProductToCart(this.Id).subscribe();
        this.IsInCart = true;
        this.Msgs.push({ severity: 'error', summary: 'Success', detail: "Added to cart." });
    }

    /*Removing product from your cart*/
    RemoveProduct(): void {
        this._cartService.deleteProduct(this.Id).subscribe();
        this.IsInCart = false;
        this.Msgs.push({ severity: 'error', summary: 'Success', detail: "Removed from cart." });
    }
}
