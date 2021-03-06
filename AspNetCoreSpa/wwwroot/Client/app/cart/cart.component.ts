import { Component, OnInit }  from '@angular/core';
import { IProduct } from '../products/product';
import { CartService } from '../cart/cart.service';

@Component({
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    public ErrorMessage: string;
    public Products: IProduct[];

    public ArticleTitle = "My Cart";
    public ArticleText = "Easy enough - just buy everything you want!";

    constructor(private _cartService: CartService) {}

    /*Executes on initialisation of page*/
    ngOnInit(): void {
        this._cartService.getProductsInCart()
            .subscribe(products => this.Products = products,
            error => this.ErrorMessage = <any>error);

        window.scroll(0, 0);
    }
}
