import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { StateService } from '../state-service/state.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  menuItems : any[] = []; ;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, 
    public auth:AuthService, 
    private router:Router,
    private state:StateService) {
      this.state.onLoginStatusChanged.subscribe((res) => {
        if(res || auth.tokenValid){
          this.menuItems = [{name:'dashboard',url:'superadmin/dashboard'},{name: 'students', url:'superadmin/students'}]
        }
        else{
          this.menuItems = [{name:'login',url:'login'},{name:'services',url:'services'},{name:'about',url:'about'},{name:'contact us',url:'contactus'}]
        }
      });
  }
  
  logout(){
    this.auth.logout();
    this.router.navigateByUrl('login');

  }
}
