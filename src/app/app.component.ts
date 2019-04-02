import { Component, OnInit } from '@angular/core';
import { RootService } from './root.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'crud';
  constructor(private rootService : RootService) { }
  
  ngOnInit() {
  }
}
