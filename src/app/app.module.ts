import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { StatementComponent } from './statement/statement.component';
import { FaqComponent } from './faq/faq.component';
import { MainComponent } from './main/main.component';

import { ReplacePipe } from './replace.pipe';


@NgModule({
  declarations: [
    AppComponent,
    StatementComponent,
    FaqComponent,
    MainComponent,
    ReplacePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
