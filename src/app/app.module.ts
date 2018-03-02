import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { StatementComponent } from './statement/statement.component';
import { FaqComponent } from './faq/faq.component';
import { StartComponent } from './start/start.component';
import { BlueprintComponent } from './blueprint/blueprint.component';
import { SingleComponent } from './single/single.component';
import { IllustrateComponent } from './illustrate/illustrate.component';
import { TogetherComponent } from './together/together.component';
import { AuthorizeComponent } from './authorize/authorize.component';
import { HireOfWorkComponent } from './hire-of-work/hire-of-work.component';


@NgModule({
  declarations: [
    AppComponent,
    StatementComponent,
    FaqComponent,
    StartComponent,
    BlueprintComponent,
    SingleComponent,
    IllustrateComponent,
    TogetherComponent,
    AuthorizeComponent,
    HireOfWorkComponent
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
