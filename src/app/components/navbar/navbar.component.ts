import { Component, OnInit , Inject } from '@angular/core';
import { Validators , FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'navbar-root',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  title = 'navbar';

  loginbtn:boolean = true;
  logoutbtn:boolean = false;
  user : any = [];
  constructor(private dataService: DataService) {
    dataService.getLoggedInName.subscribe(name => this.changeName(name));
  }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
    console.log(this.dataService.isLoggedIn());
    this.user = this.dataService.isLoggedIn();
    
    // if(dataService.isLoggedIn())
    //   {
    //     console.log("loggedin");
    //     console.log(dataService.isLoggedIn());
    //     this.loginbtn=false;
    //     this.logoutbtn=true
    //   }
    //   else{
    //    this.loginbtn=true;
    //    this.logoutbtn=false
    //   }
  }
  logout()
  {
    this.dataService.getLoadingEvent.emit(true);
    this.dataService.deleteToken();
    window.location.href = window.location.href;
    
  }
}
