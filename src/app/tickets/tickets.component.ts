import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {TicketsService} from './tickets.service';
import { Ticket} from '../ticket'
import { FormGroup, FormControl } from "@angular/forms";
import { Observable, Observer } from 'rxjs';
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
  /*tickets = new Observable<any[]>((observer: Observer<any[]>) => {
    setInterval(() => observer.next(this.ticketstuff()), 10000)
    console.log(this.TicketService.gettickets())
  });*/
  ngOnInit() {
    
  }

  get tickets(): Observable<Array<Ticket>>{
    return this.TicketService.gettickets()
  }

  //we need to figure out how to use two way binding here so that
  createticket(){
    this.TicketService.maketickets(this.ticketForm.value.ID, this.ticketForm.value.Issue, this.ticketForm.value.Location, this.ticketForm.value.Date, this.ticketForm.value.User_ID).subscribe(
      (response)=>{
        console.log("we emitted:" + this.added.emit());
      },(error)=>{
        console.log("the error was" + error);})
  }
}
