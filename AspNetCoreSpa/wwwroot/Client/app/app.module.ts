import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { DropdownModule } from 'primeng/primeng';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }  from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { AboutusComponent } from './about_us/aboutus.component';
import { SignUpComponent } from './registration/singup.component';
import { LogInComponent } from './registration/login.component';
import { GrowlModule } from 'primeng/primeng';
import { WebStorageModule, BROWSER_STORAGE_PROVIDERS } from "h5webstorage";
import { QuestionsComponent } from './questions/questions.component';
import { HelpComponent } from './help/help.component';
import { ContactsComponent } from './contacts/contacts.component';
import { QuestionService } from './shared/question.service';
import { CabinetComponent } from './cabinet/cabinet.component';
import { CartComponent } from './cart/cart.component';

/* Feature Modules */
import { ProductModule } from './products/product.module';
import { ScretchesModule } from './scretches/scretches.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
      HttpModule,
      FormsModule,
      GrowlModule,
      WebStorageModule,
      Ng2PageScrollModule.forRoot(),
      DropdownModule,
      NgbModule.forRoot(),
      AgmCoreModule.forRoot({
          apiKey: 'AIzaSyA6u-3Ld8-xS_7-43bMde1u_WY6i_rtzBA'
      }),
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'aboutus', component: AboutusComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'login', component: LogInComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'help', component: HelpComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'cabinet', component: CabinetComponent },
      { path: 'cart', component: CartComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    ProductModule,
      ScretchesModule,
      SharedModule
    ],
  providers: [BROWSER_STORAGE_PROVIDERS, QuestionService],
  declarations: [
    AppComponent,
    WelcomeComponent,
    AboutusComponent,
    SignUpComponent,
      LogInComponent,
      QuestionsComponent,
      HelpComponent,
      ContactsComponent,
      CabinetComponent,
      CartComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
