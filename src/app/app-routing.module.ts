import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatementComponent } from './statement/statement.component';
import { FaqComponent } from './faq/faq.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
    { path: '', redirectTo: '/statement', pathMatch: 'full' },
    { path: 'statement', component: StatementComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'start', component: StartComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
