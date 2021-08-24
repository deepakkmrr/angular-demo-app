import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { routes } from 'src/app/app.module';
import { MaterialModule } from 'src/app/material.module';
import { ContactusComponent } from './contactus.component';

describe("Contact Us Component",() => {
let router: Router;
let location: Location;
let fixture: ComponentFixture<ContactusComponent
>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports:[ RouterTestingModule.withRoutes(routes),
            HttpClientTestingModule,MaterialModule,],
        declarations:[
            ContactusComponent
        ]
    }).compileComponents();
    fixture = TestBed.createComponent(ContactusComponent);
}));

it( "Should create the contact us component",() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
});
})
