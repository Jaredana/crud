import { Component, OnInit, EventEmitter, Output, ViewContainerRef } from '@angular/core';
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
  editTicketForm = new FormGroup({
    ID: new FormControl(''),
    Issue: new FormControl(''),
    Location: new FormControl(''),
    Date: new FormControl(''),
    User_ID: new FormControl(''),
  });
  @Output() added: EventEmitter<any> = new EventEmitter(true);

  constructor(private TicketService: TicketsService) {}
  ticketobserve = this.TicketService.gettickets()
  tickets = null;
  EditTicket = false;
  tickettoedit = null;
  ngOnInit() {
    setTimeout(()=> {
      this.ticketobserve.subscribe(
        (response) => {
          let recieved = JSON.stringify(response.tickets);
          let array = JSON.parse(recieved);
          this.tickets = array;
        })
    }, 100)

    this.added.subscribe(
      (event) => {
        console.log("Event Fired" + event);
        this.ticketobserve.subscribe(
          (response) => {
            let recieved = JSON.stringify(response.tickets);
            let array = JSON.parse(recieved);
            this.tickets = array;
          }, (err) => {
            console.log("err getting tickets" + err);
          })
    }, (error) =>{
        console.log("Error subscribing to eventemitter" + error);
    })
  }

  gettickets(){
    console.log("getting tickets...");
    this.ticketobserve.subscribe(
    (response) => {
      let recieved = JSON.stringify(response.tickets);
      let array = JSON.parse(recieved);
      this.tickets = array;
    }, (err) => {
      console.log("err getting tickets" + err);
    })
  }

  createticket(){
    this.TicketService.maketickets(this.ticketForm.value.Issue, this.ticketForm.value.Location, this.ticketForm.value.Date, this.ticketForm.value.User_ID).subscribe(
      (response)=>{
        this.added.emit(JSON.stringify(response));
      },(error)=>{
        console.log("the error was" + error);})
  }

//Can change data in view but needs to update ticket using ticketservice.
  iseditticket(){
    if (this.EditTicket === true) 
    return true;
  }
  editticket(){
    if(this.EditTicket == true) 
      console.log('editing ticket ' + JSON.stringify(this.tickettoedit._id))
    this.editTicketForm.get('Issue').setValue(JSON.stringify(this.tickettoedit.Issue))
    this.editTicketForm.get('Location').setValue(JSON.stringify(this.tickettoedit.Location))
    this.editTicketForm.get('Date').setValue(new Date(this.tickettoedit.Date).toISOString().substring(0,10))
    this.editTicketForm.get('User_ID').setValue(JSON.stringify(this.tickettoedit.User_ID))
  }
  //Will edit tickets thru postman but not webform, need to learn how to debug this angular code...
  submitedit()
  {
  this.TicketService.edittickets(this.tickettoedit._id, this.editTicketForm.get('Issue'), this.editTicketForm.get('Location'), this.editTicketForm.get('Date'), this.editTicketForm.get('User_ID'))
  .subscribe(
      (res) => {
        this.added.emit("we emitted after editing" + JSON.stringify(res));
    });
    console.log('ticket update submitted');
    this.EditTicket = false;
  }
}
