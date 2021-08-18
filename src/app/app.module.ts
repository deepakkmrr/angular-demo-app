import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material.module';
import { MessageBarService } from './services/message-bar.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { P404Component } from './static/p404/p404.component';
import { NavComponent } from './nav/nav.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './static/about/about.component';
import { ServicesComponent } from './static/services/services.component';
import { ContactusComponent } from './static/contactus/contactus.component';
import { BasicInterceptor } from './interceptors/basic.interceptor';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { StateService } from 'src/app/state-service/state.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    },
    canActivate: [LoginGuard]
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'About'
    }
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: {
      title: 'Services'
    }
  },
  {
    path: 'contactus',
    component: ContactusComponent,
    data: {
      title: 'Contact Us'
    }
  },
  {
    path: 'superadmin',
    loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule),
    canActivate: [AuthGuard]
  },
  { path: '**', component: P404Component, data:{ title:'404 Not Found'} }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    P404Component,
    NavComponent,
    AboutComponent,
    ServicesComponent,
    ContactusComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [Title
  , {provide: HTTP_INTERCEPTORS,
    useClass: BasicInterceptor,
    multi: true,
    
  },StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
