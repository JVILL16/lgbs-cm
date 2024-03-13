import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { DataService } from './data.services';
 
@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate  {
 
  constructor(private dataService: DataService,private router: Router  ) {}
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
        const routeurl: string = state.url;
        return this.isLogin(routeurl);
  }
  isLogin(routeurl: string): any {
    if (this.dataService.isLoggedIn()) {
      return true;
    }
    //this.dataService.urlUsersData = routeurl;
    this.router.navigate(['/login']); //, {queryParams: { returnUrl: routeurl }} 
  }
}