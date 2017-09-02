import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GrowlModule } from 'primeng/primeng';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard } from './product-guard.service';

import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
      SharedModule,
      Ng2PageScrollModule.forRoot(),
      GrowlModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'product/:id/:cartToSend',
        canActivate: [ ProductDetailGuard],
        component: ProductDetailComponent,
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
  ],
  providers: [
    ProductService,
    ProductDetailGuard
  ]
})
export class ProductModule {}
