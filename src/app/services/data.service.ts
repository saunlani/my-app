import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private headerSource = new BehaviorSubject<string>("");
  currentHeader = this.headerSource.asObservable();

  constructor() { }

  changeHeader(header: string) {
    this.headerSource.next(header)
  }
}
