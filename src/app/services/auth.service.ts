import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { StateService } from '../state-service/state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get tokenValid(): boolean {

    const token = this.getToken();
    if (!token) {
      return false;
    }
    return true;
  }

  user: any;


  private setService: boolean = false;

  constructor(private http: HttpClient,
    private storage:StorageService,
    private state:StateService) {
    if (!this.setService) {
      this.setLocalVars();
    }
   }

  loginUser(data: any): Observable<any> {
    const uri = `${environment.apiurl}/security/login`;    
    return this.http.post<any>(uri, data).pipe(user => {
      return user;
    });
  }

  vendorByUserId(userId:any): Observable<any> {
    const uri = `${environment.apiurl}/vendor/vendorbyuserid/${userId}`;    
    return this.http.get(uri).pipe(user => {
      return user;
    });
  }

  private setLocalVars() {
    if (this.tokenValid) {
      this.user = JSON.parse(this.storage.getItem('active_user'));
      this.setService = true;
    }
  }

  logout() {
    this.storage.removeItem('active_user');
    this.storage.removeItem('access_token');
    this.storage.clearAll();
    this.state.onLoginStatusChanged.next(false);
  }

  public getToken(): string {
    return this.storage.getItem('access_token');
  }
}
