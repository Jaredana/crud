import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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

  @Output() added: EventEmitter<any> = new EventEmitter(true);

  constructor(private TicketService: TicketsService) {}
  tickets = null;
  
  ngOnInit() {
    let tickets = this.TicketService.gettickets()
    setTimeout(()=> {
      tickets.subscribe(
        (response) => {
          let recieved = JSON.stringify(response.tickets);
          let array = JSON.parse(recieved);
          this.tickets = array;
        })
    }, 100)
  }

  gettickets(){
    console.log("getting tickets...");
    this.added.subscribe(
      (generatorOrNext) => {
        this.TicketService.gettickets().subscribe(
          (response) => {
            let recieved = JSON.stringify(response.tickets);
            let array = JSON.parse(recieved);
            this.tickets = array;
          })
    }, (error) =>{
        console.log("Error getting tickets" + error);
    }) 
  }


  //we need to figure out how to use two way binding here so that
  createticket(){
    this.TicketService.maketickets(this.ticketForm.value.ID, this.ticketForm.value.Issue, this.ticketForm.value.Location, this.ticketForm.value.Date, this.ticketForm.value.User_ID).subscribe(
      (response)=>{
        console.log("we emitted:" + this.added.emit(JSON.stringify(response)));
      },(error)=>{
        console.log("the error was" + error);})
  }
}
