import { Component, OnInit , Inject } from '@angular/core';
import { Validators , FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.services';
import { first } from 'rxjs/operators';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'login';


  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: DataService,private router:Router) {
    this.angForm = this.fb.group({
 
      username: ['', Validators.required],
      password: ['', Validators.required]
 
    });
   }
 
  ngOnInit() {
  }
  postdata(angForm1:FormGroup)
  {
    this.dataService.userlogin(angForm1.value.username,angForm1.value.password)
      .pipe(first())
      .subscribe({
          next(data){
            console.log(data);
            //this.router.navigate(['/']);
          },
          error(err) {
            console.log(err);
              alert("User name or password is incorrect")
          }});
  }
  get username() { return this.angForm.get('username'); }
  get password() { return this.angForm.get('password'); }
  
}