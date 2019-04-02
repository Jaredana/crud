import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { LoginService } from './login.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  accountForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private LoginService: LoginService, private router: Router) { }
  ngOnInit() {
    
  }
  loginUser() {
    this.LoginService.postAPIData(this.accountForm.value.email, this.accountForm.value.password).subscribe(
      (response)=>{
      var token = response.token;
      console.log('response from post data is ', response);
      sessionStorage.setItem('token', token);
      this.router.navigateByUrl('home')
    },(error)=>{
      console.log('error during post is ', error);
    })
  }

}
