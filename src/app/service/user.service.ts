import {Injectable} from '@angular/core';
import {HttpWrapperService } from './http-wrapper.service';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpWrapperService) {
  }

  public login(data: any): Observable<any> {
    return this.http.post( environment.api.login , data);
  }

  public getStatus(options?: any): Observable<any> {
    return this.http.post( environment.api.status , options);
  }

}
