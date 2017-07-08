import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription }   from 'rxjs/Subscription';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    public PageTitle: string = 'Product Detail';
    public Product: IProduct;
    public ErrorMessage: string;
    public Back = "Back";

    public Name = "Name:";
    public Code = "Code:";
    public Description = "Description:";
    public Availability = "Available till:";
    public Price = "Price:";
    public StarRating = "5 Star Rating:";

    private sub: Subscription;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _productService: ProductService) {
    }

     /*Executes on initialisation of page*/
    ngOnInit(): void {
        this.sub = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
        });
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
        this._router.navigate(['/products']);
    }

     /*Executes on clicking the 'rating'*/
    onRatingClicked(message: string): void {
        
    }
}
