import {async, TestBed, waitForAsync} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import { LoginGuard } from './login.guard';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { routes } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';

describe('Auth guard should', () => {
    let authGuard: AuthGuard;
    let authService: AuthService;
    let router = {
        navigate: jasmine.createSpy('navigate')
    };

    // async beforeEach
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports:[ RouterTestingModule.withRoutes(routes),
                HttpClientTestingModule],
            providers: [AuthGuard, AuthService,
                {provide: Router, useValue: router}
            ]
        }).compileComponents();
    }));
    
    beforeEach(() => {
        authGuard = TestBed.inject(AuthGuard);
        authService = TestBed.inject(AuthService);
    });

    it('not be able to hit route when user is logged in', () => {
        if(authService.tokenValid)
            expect(authGuard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: '/login'})).toBe(false);
        else if(!authService.tokenValid){
            expect(authGuard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: '/login'})).toBe(true);
        }
    });
});