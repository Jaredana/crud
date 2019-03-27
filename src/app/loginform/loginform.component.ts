import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { LoginService } from './login.service';

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
  constructor(private LoginService: LoginService) { }
  ngOnInit() {
    
  }
  
  loginUser() {
    this.LoginService.postAPIData(this.accountForm.value.email, this.accountForm.value.password).subscribe((response)=>{
      console.log('response from post data is ', response);
    },(error)=>{
      console.log('error during post is ', error)
      
    })
  }
}
