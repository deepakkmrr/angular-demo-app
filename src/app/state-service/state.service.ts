import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public onLoginStatusChanged: BehaviorSubject<any>;
  public onStudentCountChanged: ReplaySubject<any>;

  constructor() { 
    this.onLoginStatusChanged = new BehaviorSubject(null);
    this.onStudentCountChanged = new ReplaySubject();
  }
}
