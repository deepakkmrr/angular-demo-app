import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component'
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { routes } from './app.module';
import { Location } from '@angular/common';

describe("App Component",() => {
let router: Router;
let location: Location;
beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports:[ RouterTestingModule.withRoutes(routes),
            HttpClientTestingModule],
        providers:[
            Location
        ],
        declarations:[
            AppComponent
        ]
    }).compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
}));

it( "Should create the app component",() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
});

it("navigate to '' should redirect it to login page", fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/login');
}))

it("navigate to '/superadmin/dashboard' should redirect it to login page", fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/login');
}))

})
