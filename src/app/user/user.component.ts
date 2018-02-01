import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  rowOutput: string;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.userService.getStatus().subscribe( res => {
        const body: any = res.body || {};
        this.rowOutput = JSON.stringify(body.user);
        console.log(this.rowOutput);
      }, err => {
        console.log(err);
        alert('Something went wrong !');
        location.href = '/';
      });
    }, 3000); // wait some time to get ready authorization

  }

}
