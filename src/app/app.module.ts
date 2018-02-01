import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { HttpWrapperService } from './service/http-wrapper.service';
import { UserService } from './service/user.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user', component: UserComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    HttpWrapperService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
