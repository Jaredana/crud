import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  Logout() {
    this.http.get('/api/auth/logout').subscribe(
      (response) => {
        console.log("something went right" + response);
        sessionStorage.removeItem('token');
        this.router.navigateByUrl('')
      },(error) => {
        console.log("something went wrong" + error);
      })
  }
}
