import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/Users';
import { DataService } from 'src/app/services/data.services';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0,transform: 'translateY(-100%)' }),
        animate(1000, style({ opacity: 1,transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit{
  title = 'home';

  usersList : any = [];
  userLogin : boolean= false;
  //users : any;

  constructor(private ds: DataService){
    console.log(ds.getToken());
    if(ds.getToken()) {
      this.home_GetUsers();
      this.userLogin = true; 
    }else this.userLogin = false;
  };

  ngOnInit(): void{
    
  }

  private home_GetUsers() {
    this.ds.getUsersData().subscribe(
      (res:Users[])=>{
      this.usersList = res;
      console.log(res);
      },
      (err)=>{
        console.log(err);
      });
  }
}
