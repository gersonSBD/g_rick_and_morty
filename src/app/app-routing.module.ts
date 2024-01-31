import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { 
    path: 'characters', 
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  { 
    path: '**', 
    pathMatch: 'full', 
    redirectTo: 'characters' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
