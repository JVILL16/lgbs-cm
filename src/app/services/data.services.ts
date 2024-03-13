import { Injectable, Output, EventEmitter, Input } from '@angular/core';
// httpClient
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/Users'
import { LoadingComponent } from 'src/app/components/loading/loading.component';

import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Roles } from '../models/Roles';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //public api url path to get user data
  readonly urlUsersData = 'https://sagejherm.co/api';
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  @Output() getLoadingEvent: EventEmitter<any> = new EventEmitter();
  @Output() getAdminEvent: EventEmitter<any> = new EventEmitter();
  @Output() getEmailCodeScreen: EventEmitter<any> = new EventEmitter();

  dashboard_user: any;
  admin_user: any = false;
  roles: Roles[] = [];
  //create an instance of it through dependency injection within the constructor
  constructor(private httpClient: HttpClient) { }

  //get users data from public api 
  public getUsersData(): Observable<Users[]> {

    return this.httpClient.get<Users[]>(this.urlUsersData + '/users/read');
  }
  public userlogin(username: string, password: string): Observable<Users[]> {
    this.getLoadingEvent.emit(true);
    this.admin_user = false;
    return this.httpClient.post<Users[]>(this.urlUsersData + '/auth/login', { username, password })
      .pipe(map(Users => {
        console.log(JSON.stringify(Users[0]));
        this.setToken(JSON.stringify(Users[0]));
        this.dashboard_user = Users[0];
        
        this.getLoggedInName.emit(true);
        for (var role of this.dashboard_user.roles) {
          if (role.profile_id == 231385) this.admin_user = true;
        }
        this.getLoadingEvent.emit(false);
        return Users;
      }));
  }

  public userregistration(username: string, email: string, password: string, first_name: string, last_name: string, phone: string, roles: any): Observable<Users> {

    return this.httpClient.post<Users>(this.urlUsersData + '/auth/register', { username, email, password, first_name, last_name, phone, roles })
      .pipe(map(Users => {
        this.getEmailCodeScreen.emit(true);
        return Users;
      }));
  }
  public rolesregister(account_id: number,roles: any): Observable<Roles> {

    return this.httpClient.post<Roles>(this.urlUsersData + '/users/roles/add', { account_id, roles })
      .pipe(map(Roles => {
        
        return Roles;
      }));
  }
  public removerole(id: number): any {

    return this.httpClient.delete(this.urlUsersData + '/users/roles/rmv_role?id=' + id);
  }


  public removeuser(id: number): any {

    return this.httpClient.delete(this.urlUsersData + '/auth/remove?id=' + id);
  }

  public getProfileData(): Observable<Roles[]> {

    return this.httpClient.get<Roles[]>(this.urlUsersData + '/users/profile/list');
  }
  //token
  setToken(token: any): any {
    localStorage.setItem('token', token);
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  deleteToken(): any {
    this.getLoadingEvent.emit(false);
    localStorage.removeItem('token');
  }

  isLoggedIn(): any {
    const usertoken = this.getToken();

    if (usertoken != null) {
      console.log(usertoken);
      return true && this.dashboard_user;
    }
    return false;
  }
isAdmin(): any{
  return this.admin_user;
}
  
}