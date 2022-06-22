import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user-management/user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserActivationComponent } from './user-activation/user-activation.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: 'login', component: LoginComponent},
  {path: 'account-activation/:activationcode', component: UserActivationComponent},
  { path: 'resources/not_found', component: NotFoundComponent},
  {path: 'home', component: HomeComponent, children:[
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
     { path: 'dashboard', component: DashboardComponent},
    { path: 'user-management', component: UserComponent},
    
  ]},
  {path:'**', redirectTo: 'resources/not_found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
