import { Component , OnInit } from '@angular/core';  
import { Title } from '@angular/platform-browser';  
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';  
import { filter } from 'rxjs/operators';  
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
        
  constructor(private router: Router,  
    private activatedRoute: ActivatedRoute,  
    private titleService: Title,
     public auth: AuthService) {

  }

  ngOnInit() {  
    this.router.events.pipe(  
        filter(event => event instanceof NavigationEnd),  
      ).subscribe(() => {  
        const rt = this.getChild(this.activatedRoute);  
        rt.data.subscribe((data: { title: string; }) => {  
          console.log(data);  
          this.titleService.setTitle(data.title)});  
      });  
  }  
  
  getChild(activatedRoute: ActivatedRoute):any {  
    if (activatedRoute.firstChild) {  
      return this.getChild(activatedRoute.firstChild);  
    } else {  
      return activatedRoute;  
    }  
  
  }  
}
