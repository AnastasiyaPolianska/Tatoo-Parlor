import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { ProductFilterPipe } from '../products/product-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GrowlModule } from 'primeng/primeng';

import { AllProductsComponent } from './allProducts.component';
import { SpinnerComponent } from './spinner.component';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, NgbModule.forRoot(), BrowserAnimationsModule, GrowlModule],
  exports : [
    CommonModule,
    FormsModule,
    AllProductsComponent,
    SpinnerComponent,
    ProductFilterPipe,
    RouterModule,
    NgbModule
  ],
  declarations: [AllProductsComponent, SpinnerComponent, ProductFilterPipe],
  providers: [AuthService]
})
export class SharedModule { }
