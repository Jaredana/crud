import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }
  Logout() {
    this.http.get('/api/auth/logout').subscribe(
      (response) => {
        console.log("something went right");
        sessionStorage.removeItem('token');
      },(error) => {
        console.log("something went wrong");
      })
  }
}
