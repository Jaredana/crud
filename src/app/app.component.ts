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
    //testing get data
    this.rootService.getAPIData().subscribe((response)=>{
        console.log('response is ', response)
    },(error) => {
        console.log('error is ', error)
    })
    //testing post data
    this.rootService.postAPIData().subscribe((response)=>{
      console.log('response from post data is ', response);
    },(error)=>{
      console.log('error during post is ', error)
    })

  }
}
