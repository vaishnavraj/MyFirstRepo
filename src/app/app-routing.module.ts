import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiskassessmenthomeComponent } from './riskassessmenthome/riskassessmenthome.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: RiskassessmenthomeComponent
  },
  {
    path: 'riskassessmenthome',
    component: RiskassessmenthomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
