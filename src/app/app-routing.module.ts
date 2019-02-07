import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiskassessmenthomeComponent } from './riskassessmenthome/riskassessmenthome.component';
import { AboutComponent } from './about/about.component';
import { RiskcomplianceComponent } from './riskcompliance/riskcompliance.component';

const routes: Routes = [
  {
    path: '',
    component: RiskassessmenthomeComponent
  },
  {
    path: 'riskassessmenthome',
    component: RiskassessmenthomeComponent
  },{
    path: 'riskcompliance',
    component: RiskcomplianceComponent
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
