import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { MainComponent } from './main/main.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'disclaimer', component: DisclaimerComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'main', component: MainComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
