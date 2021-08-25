import { ComponentFixture, TestBed, async, fakeAsync, tick, waitForAsync, flush } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupStudentComponent } from './popup-student.component';
import { MaterialModule } from 'src/app/material.module';
import { routes } from 'src/app/app.module';
import { MessageBarService } from 'src/app/services/message-bar.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';

describe("Popup Student Component",() => {
let router: Router;
let location: Location;
let matDialogRef: MatDialogRef<PopupStudentComponent>;
let fixture: ComponentFixture<PopupStudentComponent>;
let component: PopupStudentComponent;
let validData: any;
const formBuilder: FormBuilder = new FormBuilder();


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
            { provide: FormBuilder, useValue: formBuilder },
            { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {data:null,mode:'Add'} }
        ],
        declarations:[
            PopupStudentComponent
        ]
    }).compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture =  TestBed.createComponent(PopupStudentComponent);
    component = fixture.componentInstance;
    validData = {
        id:'00000000-0000-0000-0000-000000000000',
        firstName: 'deepak',
        lastName: 'kumar',
        fatherName: 'fathername',
        motherName: 'mothername',
        contact: '+9197181117187',
        email: 'email@gmail.com',
        address: 'address'
    }
}));



it( "Should create the Popup Student component",() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
});

it('component initial state', () => {
    expect(component.title).toBeDefined();
});

it('create the student form', () => {
    component.createForm(null);
    expect(component.studentForm).toBeDefined();
    expect(component.studentForm.invalid).toBeTruthy();
});

it('form value should update from when u change the input', (() => {
    component.createForm(validData);
    expect(component.studentForm.value).toEqual(validData);
    expect(component.studentForm.valid).toBe(true);
}));

it('Form invalid should be true when form is invalid', (() => {
    component.createForm(null);
    expect(component.studentForm.invalid).toBeTruthy();
}));

it('submit() should called ', fakeAsync(() => {
    component.createForm(validData);
    fixture.detectChanges();
    spyOn(component,'submit');
    fixture.debugElement.query(By.css("form")).triggerEventHandler('submit', null);
    fixture.detectChanges();
    expect(component.submit).toHaveBeenCalledTimes(1);
    flush();
  }));

})
