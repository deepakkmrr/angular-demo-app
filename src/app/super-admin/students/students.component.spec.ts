import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { routes } from 'src/app/app.module';
import { MaterialModule } from 'src/app/material.module';
import { StudentsComponent } from './students.component';

describe("Student Component",() => {
let fixture: ComponentFixture<StudentsComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports:[ RouterTestingModule.withRoutes(routes),
            HttpClientTestingModule,MaterialModule,],
        declarations:[
            StudentsComponent
        ]
    }).compileComponents();
    fixture = TestBed.createComponent(StudentsComponent);
}));

it( "Should create the students component",() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
});

it( "should get the student list",() => {
    const component = fixture.debugElement.componentInstance;
    expect(component.REQUESTS).toBeDefined();
    expect(component.REQUESTS.length).toBeGreaterThanOrEqual(0);
});

it( "open popup on add",() => {
    const component = fixture.debugElement.componentInstance;
    spyOn(component.dialog, 'open')
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.dialog.open).toHaveBeenCalledTimes(1);
});

it( "open popup on edit",() => {
    const component = fixture.debugElement.componentInstance;
    spyOn(component.dialog, 'open')
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.dialog.open).toHaveBeenCalledTimes(1);
});

})
