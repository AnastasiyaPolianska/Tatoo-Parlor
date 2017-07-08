import { Component, OnInit }  from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    public ErrorMessage ="";
    public Products: IProduct[];

    public ArticleTitle = "Product-list";
    public ArticleText = "You can buy different tatoo products on this page. Simply find the products you need using filters below and click on their names to look at product details.";

    constructor(private _productService: ProductService) {
    }

    /*Executes on initialisation of page*/
    ngOnInit(): void {
        this._productService.getProducts()
                .subscribe(products => this.Products = products,
                           error => this.ErrorMessage = <any>error);
    }
}
