import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpWrapperService } from '../service/http-wrapper.service';
import { UserService } from '../service/user.service';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFromData: FormGroup;

  constructor(
    private userService: UserService,
    private httpWrapperService: HttpWrapperService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    window['onCaptcha'] = (token) => {
      this.loginFromData.controls['captcha'].setValue(token);
      this.changeDetectorRef.detectChanges();
    };

    this.loginFromData = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      captcha: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
  }

  login() {
    const loginData = this.loginFromData.getRawValue();
    this.userService.login({
      username: loginData.username,
      password_md5: Md5.hashStr(loginData.password),
      captcha: loginData.captcha
    }).subscribe(data => {
      if (data.headers) {
        this.httpWrapperService.createHeaders({
          xFalconToken: data.headers.get('X-FALCON-TOKEN'),
          xXsrfToken: data.headers.get('X-XSRF-TOKEN')
        });

        this.router.navigate(['/user']);
      }
    }, err => {
      console.log(err);
      alert('Something went wrong !');
    });
  }
}
