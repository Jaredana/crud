import { Component, OnInit } from '@angular/core';
import {TicketsService} from './tickets.service';
import { FormGroup, FormControl } from "@angular/forms";
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  ticketForm = new FormGroup({
    ID: new FormControl(''),
    Issue: new FormControl(''),
    Location: new FormControl(''),
    Date: new FormControl(''),
    User_ID: new FormControl(''),
  });
  constructor(private TicketService: TicketsService) { }

  ngOnInit() {
  }
  //this may not be working due to the fact that it is expecting info to be in body and not params. needs more research
  createticket(ID, Issue, Location, Date, User_ID){
    this.TicketService.maketickets(ID, Issue, Location, Date, User_ID).subscribe(
      (response)=>{
        console.log("the response was" + response);
        console.log("the ticket was" + response.ticket);
      },(error)=>{
        console.log("the error was" + error);
      })
  }
}
