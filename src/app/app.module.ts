import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginformComponent } from './loginform/loginform.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { JwtModule, JwtHelperService, JwtModuleOptions } from '@auth0/angular-jwt';
import { AuthGuardService } from './loginform/auth-guard.service';
import { TicketsComponent } from './tickets/tickets.component';
import { NavbarComponent } from './navbar/navbar.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}
const JWT_Module_Options: JwtModuleOptions = {
  config: {
      tokenGetter: tokenGetter,
      whitelistedDomains: ['home']
  }
};
@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    HomeComponent,
    TicketsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot(JWT_Module_Options),
  ],
  providers: [
    AuthGuardService,
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 
  
}
