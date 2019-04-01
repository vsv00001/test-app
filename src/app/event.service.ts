import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

//@Injectable()
@Injectable({
  providedIn: 'root'
})

export class EventService {
  httpSer;

  constructor(http: HttpClient) {
    this.httpSer = http;
  }

  getEventList(valParam) {
    return this.httpSer.get('http://localhost:8080/sysevent/',{params:valParam});
  }

}
