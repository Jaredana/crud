import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { LoginformComponent } from './loginform/loginform.component';
import { AuthGuardService } from './loginform/auth-guard.service';
import { TicketsComponent } from './tickets/tickets.component';
const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: '', component: LoginformComponent},
  {path: 'ticket', component: TicketsComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
