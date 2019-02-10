import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { VisualizeComponent } from './visualize/visualize.component'
import { DimensionReductionComponent } from './dimension-reduction/dimension-reduction.component'
import { AnimationComponent } from './animation/animation.component'
import { ContactComponent } from './contact/contact.component'

const routes: Routes = [
  {path: '', redirectTo: '/visualize', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'visualize', component: VisualizeComponent},
  {path: 'reduction', component: DimensionReductionComponent},
  {path: 'animation', component: AnimationComponent},
  {path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
