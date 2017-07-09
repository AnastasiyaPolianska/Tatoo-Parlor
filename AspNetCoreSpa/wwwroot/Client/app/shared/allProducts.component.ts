import { Component, Input}  from '@angular/core';
import { IProduct } from '../products/product';

@Component({
    selector: 'all-products',
    templateUrl: './allProducts.component.html',
    styleUrls: ['./allProducts.component.css']
})
export class AllProductsComponent{
    @Input() public AllProducts: IProduct[];

    public PageTitle: string = 'Product List';
    public ImageWidth: number = 50;
    public ImageMargin: number = 2;
    public ListFilter: string;
    @Input() public ErrorMessage: string; 
    @Input() public IsCart: boolean; 

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

    val = 5;

    public RemoveProduct(): void {

    }

    public BuyAll(): void {
    }
}