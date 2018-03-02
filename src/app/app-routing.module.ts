import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatementComponent } from './statement/statement.component';
import { FaqComponent } from './faq/faq.component';
import { StartComponent } from './start/start.component';

import { BlueprintComponent } from './blueprint/blueprint.component';
import { SingleComponent } from './single/single.component';
import { IllustrateComponent } from './illustrate/illustrate.component';
import { TogetherComponent } from './together/together.component';
import { AuthorizeComponent } from './authorize/authorize.component';

const routes: Routes = [
    { path: '', redirectTo: '/statement', pathMatch: 'full' },
    { path: 'statement', component: StatementComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'start', component: StartComponent },
    { path: 'blueprint', component: BlueprintComponent },
    { path: 'single', component: SingleComponent },
    { path: 'illustrate', component: IllustrateComponent },
    { path: 'together', component: TogetherComponent },
    { path: 'authorize', component: AuthorizeComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
