import { Component, OnInit }  from '@angular/core';
import { IProduct } from '../products/product';
import { ProductService } from '../products/product.service';

@Component({
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    public ErrorMessage: string;
    public Products: IProduct[];

    public ArticleTitle = "My Cart";
    public ArticleText = "Easy enough - just buy everything you want!";

    constructor(private _productService: ProductService) {
    }

    /*Executes on initialisation of page*/
    ngOnInit(): void {
        this._productService.getProducts()
                .subscribe(products => this.Products = products,
                           error => this.ErrorMessage = <any>error);
    }
}
