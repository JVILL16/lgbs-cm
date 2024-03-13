import { Component, OnInit , Inject } from '@angular/core';
import { Validators , FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.services';
import { first } from 'rxjs/operators';
import { trigger, transition, animate, style } from '@angular/animations';
import { Users } from 'src/app/models/Users';

@Component({
  selector: 'register-root',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('fadeIn', [
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
export class RegisterComponent implements OnInit {
  title = 'register';
  //angForm: FormGroup;
  //user: Users[];
  email: string ="";
  password: string ="";
  username: string ="";
  first_name: string ="";
  last_name: string ="";
  phone: string ="";
  roles: any = [{id:'179925',value:'Clutch',checked: false},{id:'539978',value:'Grocery',checked: false},{id:'578343',value:'Kickball',checked: false}];

  role_submit : any = [];

  constructor(private fb: FormBuilder,private dataService: DataService,private router:Router) {
 
    // this.angForm = this.fb.group({
    //   email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
    //   password: ['', Validators.required],
    //   username: ['', Validators.required],
    //   first_name: ['', Validators.required],
    //   last_name: ['', Validators.required],
    //   phone: ['', Validators.required]
 
    // });
   }
 
  ngOnInit() {
  }
  postdata()
  {
    for(var role of this.roles)
        if(role.checked) this.role_submit.push(role.id);
    this.dataService.userregistration(this.username,this.email,this.password,this.first_name,this.last_name,this.phone,this.role_submit)
      .pipe(first())
      .subscribe({
          next(data){
            console.log(data);
            //this.router.navigate(['/login']);
          },
          error(error) {
            console.log(error);
          }});
  }
  // get email() { return this.angForm.get('email'); }
  // get password() { return this.angForm.get('password'); }
  // get username() { return this.angForm.get('username'); }
  // get first_name() { return this.angForm.get('first_name'); }
  // get last_name() { return this.angForm.get('last_name'); }
  // get phone() { return this.angForm.get('phone'); }
}
