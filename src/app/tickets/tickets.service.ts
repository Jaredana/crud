import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TicketsService {
 
  constructor(private http: HttpClient) { }
  
  gettickets(): Observable<any> 
  {
    return this.http.get('api/ticket/getticket');
  }


  maketickets(Issue, Location, my_Date, User_ID): Observable<any>
  {
    return this.http.post('/api/ticket/maketicket', {'Issue': Issue,'Location': Location, 'Date': my_Date,'User_ID': User_ID});
  }

  edittickets(ID_to_edit, Issue, Location, my_Date, User_ID): Observable<any>
  {
    return this.http.post('/api/ticket/editticket', {'ID_to_edit': ID_to_edit, 'Issue': Issue, 'Location': Location, 'Date' : my_Date, 'User_ID': User_ID});
  }

 
}
