import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { routes } from 'src/app/app.module';
import { AboutComponent } from './about.component';
import { MaterialModule } from 'src/app/material.module';

describe("About Component",() => {
let router: Router;
let location: Location;
let fixture: ComponentFixture<AboutComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports:[ RouterTestingModule.withRoutes(routes),
            HttpClientTestingModule,MaterialModule,],
        declarations:[
            AboutComponent
        ]
    }).compileComponents();
    fixture = TestBed.createComponent(AboutComponent);
}));

it( "Should create the about component",() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
});
})
