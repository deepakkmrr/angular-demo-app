import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentlist():Observable<any>{
    const uri = `${environment.apiurl}/student/list`;    
    return this.http.get<any>(uri).pipe(user => {
      return user;
    });
  }

  getStudentCount():Observable<any>{
    const uri = `${environment.apiurl}/student/count`;    
    return this.http.get<any>(uri).pipe(user => {
      return user;
    });
  }

  saveStdudentDetails(data:any):Observable<any>{
    const uri = `${environment.apiurl}/student/add`;    
    return this.http.post<any>(uri,data).pipe(user => {
      return user;
    });
  }

  updateStudentDetails(data:any):Observable<any>{
    const uri = `${environment.apiurl}/student/update`;    
    return this.http.post<any>(uri,data).pipe(user => {
      return user;
    });
  }

  deleteStudent(id:string):Observable<any>{
    const uri = `${environment.apiurl}/student/remove/${id}`;    
    return this.http.post<any>(uri,null).pipe(user => {
      return user;
    });
  }
}
