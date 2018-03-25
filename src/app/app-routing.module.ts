import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FaqComponent } from './faq/faq.component';
import { MainComponent } from './main/main.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

const routes: Routes = [
    { path: 'disclaimer', component: DisclaimerComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'main', component: MainComponent },
    { path: '', redirectTo: '/disclaimer', pathMatch: 'full' },
    { path: '**', redirectTo: '/disclaimer' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
