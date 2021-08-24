import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { routes } from 'src/app/app.module';
import { MaterialModule } from 'src/app/material.module';
import { DashboardComponent } from './dashboard.component';

describe("dashboard Component",() => {
let router: Router;
let location: Location;
let fixture: ComponentFixture<DashboardComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports:[ RouterTestingModule.withRoutes(routes),
            HttpClientTestingModule,MaterialModule,],
        declarations:[
            DashboardComponent
        ]
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
}));

it( "Should create the dashboard component",() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
});

it( "onInit should get student count",fakeAsync(() => {
    const component = fixture.debugElement.componentInstance;
    
    component.ngOnInit();
    fixture.whenStable().then(() => {
        expect(component.studentCount).toBeDefined();    
        expect(component.studentCount).toBeGreaterThanOrEqual(0);
      })
   
    flush();
}));

})
