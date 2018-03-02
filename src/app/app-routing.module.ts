import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatementComponent } from './statement/statement.component';
import { FaqComponent } from './faq/faq.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
    { path: '', redirectTo: '/statement', pathMatch: 'full' },
    { path: 'statement', component: StatementComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'main', component: MainComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
