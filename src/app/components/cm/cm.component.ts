import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.services';
import { LoadingComponent } from '../loading/loading.component';
import { Users } from 'src/app/models/Users';
import { first } from 'rxjs';

@Component({
  selector: 'cm-root',
  templateUrl: './cm.component.html',
  styleUrls: ['./cm.component.scss']
})
export class CMComponent implements OnInit{
  
  title = 'cm';
  user_check:any;
  usersList : any = [];
  profileList : any = [];
  listAdd : any = [];
  profileAddList: any = [];
  showRole : any = '';
  displayRoles : any = false;
  rmv_role_id : any;
  acc_id : any;

  

  
  constructor(private dataService : DataService, private loadingScreen: LoadingComponent) {
    //this.user_check = dataService.isAdmin();
    this.user_check = true;
   }
 
  ngOnInit() {
    // this.user = this.dataService.isLoggedIn();
    if(this.user_check) this.home_GetUsers(); else this.usersList = [];
    
  }

  auth_RemoveRole(id:number){
    this.dataService.removerole(id).subscribe({
      next(data: any){
        console.log(data);
      },
      error(error: any)  {
        console.log(error);
      }
    });
    this.home_GetUsers(); 
  }
  auth_RemoveUser(id:number){
    this.dataService.removeuser(id).subscribe({
      next(data: any){
        console.log(data);
      },
      error(error: any)  {
        console.log(error);
      }
    });
    this.home_GetUsers(); 
  }
  authShowRoles(index:number){
    this.displayRoles = !this.displayRoles;
    this.showRole= 'showRole'+index;
  }
  removeRole(id: number){
    this.rmv_role_id = id;
  }
  home_GetUsers(): void {
    this.dataService.getUsersData().subscribe({
      // (res:Users[])=>{
      //   this.usersList = res;
      //   console.log(res);
      //   },
      //   (err)=>{
      //     console.log(err);
      //   }
      next:(response) =>{
        this.usersList = response;
        //console.log(this.usersList);
      },
      error: (error) =>{
        console.log(error);
      }

    });      
    this.home_GetProfile();
  }
  home_GetProfile() : void {
    this.dataService.getProfileData().subscribe({
      next:(response) =>{
        this.profileList = response.map(v=>({...v,checked:false}));
        console.log(this.profileList);
      },
      error: (error) =>{
        console.log(error);
      }

    }); 
  }

  addRole(roles: any){
    console.log(roles.roles);
    this.acc_id = roles.account_id;
    this.profileAddList = this.profileList.filter((p:any)=>!roles.roles.some((r:any)=>p.profile_id === r.profile_id));
    console.log(this.profileAddList);
  }
  auth_AddRole() {
    for (var profile of this.profileAddList)
      if (profile.checked) this.listAdd.push(profile.profile_id);
    this.dataService.rolesregister(this.acc_id, this.listAdd)
      .pipe(first())
      .subscribe({
        next(data) {
          console.log(data);
        },
        error(error) {
          console.log(error);
        }
      });
    this.home_GetUsers();
  }
 
  
}
