import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { StatementComponent } from './statement/statement.component';
import { FaqComponent } from './faq/faq.component';
import { MainComponent } from './main/main.component';

import { ReplacePipe } from './replace.pipe';
import { SelectComponent } from './select/select.component';


@NgModule({
  declarations: [
    AppComponent,
    StatementComponent,
    FaqComponent,
    MainComponent,
    ReplacePipe,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
