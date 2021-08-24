import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { routes } from 'src/app/app.module';
import { MaterialModule } from 'src/app/material.module';
import { P404Component } from './p404.component';

describe("p404 Component",() => {
let router: Router;
let location: Location;
let fixture: ComponentFixture<P404Component>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports:[ RouterTestingModule.withRoutes(routes),
            HttpClientTestingModule,MaterialModule,],
        declarations:[
            P404Component
        ]
    }).compileComponents();
    fixture = TestBed.createComponent(P404Component);
}));

it( "Should create the p404 component",() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
});
})
