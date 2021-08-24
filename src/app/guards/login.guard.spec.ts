import {async, TestBed, waitForAsync} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import { LoginGuard } from './login.guard';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { routes } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('Logged in guard should', () => {
    let loggedInGuard: LoginGuard;
    let authService: AuthService;
    let router = {
        navigate: jasmine.createSpy('navigate')
    };

    // async beforeEach
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports:[ RouterTestingModule.withRoutes(routes),
                HttpClientTestingModule],
            providers: [LoginGuard, AuthService,
                {provide: Router, useValue: router}
            ]
        }).compileComponents();
    }));
    
    beforeEach(() => {
        loggedInGuard = TestBed.inject(LoginGuard);
        authService = TestBed.inject(AuthService);
    });

    it('be able to hit route when user is logged in', () => {
        if(authService.tokenValid)
            expect(loggedInGuard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: '/superadmin/dashboard'})).toBe(false);
        else if(!authService.tokenValid){
            expect(loggedInGuard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: '/superadmin/dashboard'})).toBe(true);
        }
    });
});