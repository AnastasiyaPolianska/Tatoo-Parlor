import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { ScretchesComponent } from './scretches.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'scretches', component: ScretchesComponent },
    ])
  ],
  declarations: [
    ScretchesComponent
  ]
})
export class ScretchesModule {}