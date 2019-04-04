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
  constructor(private TicketService: TicketsService) { 
    
  }
  tickets; 
  ngOnInit() {
    this.gettickets();
  }
  gettickets(){
    this.TicketService.gettickets().subscribe(
      (response)=> {
        this.tickets = response;
      }, (error)=> {
        console.log("the error is" + error);
      }
    );
  }
  //we need to figure out how to use two way binding here so that
  createticket(){
    this.TicketService.maketickets(this.ticketForm.value.ID, this.ticketForm.value.Issue, this.ticketForm.value.Location, this.ticketForm.value.Date, this.ticketForm.value.User_ID).subscribe(
      (response)=>{
        this.gettickets();
      },(error)=>{
        console.log("the error was" + error);
      })
  }
}
