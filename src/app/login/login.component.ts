import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageBarService, MessageType } from '../services/message-bar.service';
import { StorageService } from '../services/storage.service';
import { StateService } from '../state-service/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error:string="";
  loginForm!: FormGroup;
  
  constructor(private messageBar:MessageBarService,
    private auth:AuthService,
    private storage:StorageService,
    private router: Router,
    private state: StateService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm  = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  submit(){
    console.log(this.loginForm);
    if(this.loginForm.valid){
        this.auth.loginUser(this.loginForm.value).subscribe((res) => {
          this.messageBar.showMessageBar(MessageType.SUCCESS,"Loggedin successfully!");
          this.state.onLoginStatusChanged.next(true);
          this.auth.user = res;
          this.storage.setItem('active_user',  JSON.stringify(this.auth.user));
          this.storage.setItem('access_token',  this.auth.user.token);

          this.router.navigate(['/superadmin/dashboard']);
        },
        (err) => {
          this.messageBar.showMessageBar(MessageType.ERROR,"Error logging in!");
          this.state.onLoginStatusChanged.next(false);
        })
        
    }
    else{
      this.messageBar.showMessageBar(MessageType.ERROR,"Form data are in valid!");
      this.state.onLoginStatusChanged.next(false);
    }
  }

}
