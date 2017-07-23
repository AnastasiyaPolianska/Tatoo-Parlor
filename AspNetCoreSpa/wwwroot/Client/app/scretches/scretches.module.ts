import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { RadioButtonModule } from 'primeng/primeng';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { ScretchesComponent } from './scretches.component';

import { ScretchService } from './scretch.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
      SharedModule,
      RadioButtonModule,
      Ng2PageScrollModule.forRoot(),
    RouterModule.forChild([
      { path: 'scretches', component: ScretchesComponent },
    ])
  ],
  declarations: [
    ScretchesComponent
  ],
  providers: [
      ScretchService
  ]
})
export class ScretchesModule {}