import { Component, Input}  from '@angular/core';

@Component({
    selector: 'spinnerNum',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent{
    @Input() public IncomeVal: number;

    public Increase(): void {
        this.IncomeVal++;
    }

    public Decrease(): void {
        if (this.IncomeVal > 1) this.IncomeVal--;
    }
}