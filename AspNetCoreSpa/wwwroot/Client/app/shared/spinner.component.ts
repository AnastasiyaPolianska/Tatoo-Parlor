import { Component, Input, Output, EventEmitter}  from '@angular/core';

@Component({
    selector: 'spinnerNum',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent{
    @Input() public IncomeVal: number;
    @Output() public IncreaseAmount: EventEmitter<number> = new EventEmitter(); 
    @Output() public DecreaseAmount: EventEmitter<number> = new EventEmitter(); 

    public TitleIncrease = "Click to increase quantity";
    public TitleDecrease = "Click to decrease quantity";

    /*Increasing amount of product in cart*/
    public Increase(): void {
        this.IncreaseAmount.emit();
    }

    /*Decreasing amount of product in cart*/
    public Decrease(): void {
        this.DecreaseAmount.emit();
    }
}