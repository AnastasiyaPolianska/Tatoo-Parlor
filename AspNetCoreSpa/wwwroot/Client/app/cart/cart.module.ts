import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { CartComponent } from './cart.component';

import { CartService } from './cart.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'cart', component: CartComponent }
    ])
  ],
  declarations: [
      CartComponent
  ],
  providers: [
      CartService
  ],
})
export class CartModule {}
