import { ComponentFixture, TestBed, async, fakeAsync, tick, waitForAsync, flush } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { LoginComponent } from './login.component';
import { routes } from '../app.module';
import { MessageBarService } from '../services/message-bar.service';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe("Login Component",() => {
let router: Router;
let location: Location;
let fixture: ComponentFixture<LoginComponent>;
let component: LoginComponent;
let validUser: any;


function updateForm(userEmail: any, userPassword: any) {
    component.loginForm.controls['username'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
}

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports:[ RouterTestingModule.withRoutes(routes),
            HttpClientTestingModule,
            MaterialModule,
            FormsModule, ReactiveFormsModule,
            BrowserAnimationsModule ],
        providers:[
            Location,
            MessageBarService,
        ],
        declarations:[
            LoginComponent
        ]
    }).compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture =  TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    validUser = {
        username:'deepak@gmail.com',
        password: 'admin'
    }
}));



it( "Should create the Login component",() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
});

it('component initial state', () => {
    expect(component.error).toBe("");
    expect(component.loginForm).toBeUndefined();
});

it('create the login form', () => {
    component.createForm();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
});

it('form value should update from when u change the input', (() => {
    component.createForm();
    updateForm(validUser.username, validUser.password);
    expect(component.loginForm.value).toEqual(validUser);
    expect(component.loginForm.valid).toBeTruthy();
}));

it('Form invalid should be true when form is invalid', (() => {
    component.createForm();
    updateForm("", "");
    expect(component.loginForm.invalid).toBeTruthy();
}));

it('loginService login() should called ', fakeAsync(() => {
    component.createForm();
    updateForm(validUser.username, validUser.password);
    fixture.detectChanges();
    spyOn(component,'submit');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.submit).toHaveBeenCalledTimes(1);
    // expect(location.path()).toBe('');
    flush();
  }));

})
