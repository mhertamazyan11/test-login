import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { UserService } from './service/user.service';
import { HttpWrapperService } from './service/http-wrapper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
