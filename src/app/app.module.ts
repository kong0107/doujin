import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { FaqComponent } from './faq/faq.component';
import { MainComponent } from './main/main.component';

import { SelectComponent } from './select/select.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DelegationComponent } from './delegation/delegation.component';
import { AnthologyWithContributorComponent } from './anthology-with-contributor/anthology-with-contributor.component';
import { AnthologyWithoutContributorComponent } from './anthology-without-contributor/anthology-without-contributor.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DisclaimerComponent,
    FaqComponent,
    MainComponent,
    SelectComponent,
    CheckboxComponent,
    DelegationComponent,
    AnthologyWithContributorComponent,
    AnthologyWithoutContributorComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
