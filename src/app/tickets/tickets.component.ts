import { Component, OnInit, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import {TicketsService} from './tickets.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  ticketForm = new FormGroup({
    Issue: new FormControl('', Validators.required),
    Location: new FormControl('', Validators.required),
    User_ID: new FormControl('', Validators.required),
  });
  editTicketForm = new FormGroup({
    Issue: new FormControl('', Validators.required),
    Location: new FormControl('', Validators.required),
    Date: new FormControl('', Validators.required),
    User_ID: new FormControl('', Validators.required),
  });
  @Output() added: EventEmitter<any> = new EventEmitter(true);

  constructor(private TicketService: TicketsService) {}
  ticketobserve = this.TicketService.gettickets()
  tickets = null;
  EditTicket = false;
  tickettoedit = null;

  ngOnInit() 
  {
    setTimeout(()=> {
      this.ticketobserve.subscribe(
        (response) => {
          let recieved = JSON.stringify(response.body.ticket);
          //let array = JSON.parse(recieved);
          this.tickets = recieved;
        })
    }, 10)

    this.added.subscribe(
      (event) => {
        console.log("Event Fired \n" + event);
        //Subscribe to ticket grabbing service to refresh tickets on list edit
        this.ticketobserve.subscribe(
          (response) => {
            let recieved = JSON.stringify(response.body.ticket);
            //let array = JSON.parse(recieved);
            this.tickets = recieved;
          }, (err) => {
            console.log("err getting tickets" + err);
          })
    }, (error) =>{
        console.log("Error subscribing to eventemitter" + error);
    })
  }

  gettickets()
  {
    console.log("getting tickets...");
    this.ticketobserve.subscribe(
    (response) => {
      console.log('response was: ' + response)
      let recieved = JSON.stringify(response.body.ticket);
      //let array = JSON.parse(recieved);
      this.tickets = recieved;
    }, (err) => {
      console.log("err getting tickets" + JSON.stringify(err));
    })
  }
  //Maybe change so that instead of user inputted Date, Date is determined upon ticket submission
  createticket()
  {
    let my_Date = new Date().toLocaleDateString();
    this.TicketService.maketickets(this.ticketForm.value.Issue, this.ticketForm.value.Location, my_Date, this.ticketForm.value.User_ID).subscribe(
      (response)=>{
        this.added.emit(JSON.stringify(response));
      },(error)=>{
        console.log("the error was" + error);})
  }

//Can change data in view but needs to update ticket using ticketservice.
  iseditticket()
  {
    if (this.EditTicket === true) 
    return true;
  }
  editticket()
  {
    let Issue = JSON.stringify(this.tickettoedit.Issue).replace(/"/g,"");
    let my_date = new Date(this.tickettoedit.Date).toISOString().substring(0,10);
    let Location = JSON.stringify(this.tickettoedit.Location).replace(/"/g,"");
    let User_ID = JSON.stringify(this.tickettoedit.User_ID).replace(/"/g,"");
    if(this.EditTicket == true) 
      console.log('editing ticket ' + JSON.stringify(this.tickettoedit._id))
    this.editTicketForm.get('Issue').setValue(Issue);
    this.editTicketForm.get('Location').setValue(Location);
    this.editTicketForm.get('Date').setValue(my_date);
    this.editTicketForm.get('User_ID').setValue(User_ID);
  }
  //Will edit tickets thru postman but not webform, need to learn how to debug this angular code...
  submitedit()
  {
  let Issue = this.editTicketForm.get('Issue').value.replace(/"/g,"");
  let my_date = this.editTicketForm.get('Date').value.replace(/"/g,"");
  let Location = this.editTicketForm.get('Location').value.replace(/"/g,"");
  let User_ID = this.editTicketForm.get('User_ID').value.replace(/"/g,"");
  this.TicketService.edittickets(this.tickettoedit._id, Issue, Location, my_date, User_ID)
  .subscribe(
      (response) => {
        this.added.emit("we emitted after editing" + JSON.stringify(response));
    }
    , (error) => {
      console.log("There was an err: " + JSON.stringify(error));
    })
    console.log("ticket updated");
    this.EditTicket = false;
  }
  deleteticket()
  {
    console.log('deleting ticket');
    this.TicketService.deleteticket(this.tickettoedit._id).subscribe(
      (response) => {
        this.added.emit("We emit after deleting " + response);
        this.EditTicket = false;
      }, (error) => {
        console.log("There was an error " + error)
      })
  }

}
