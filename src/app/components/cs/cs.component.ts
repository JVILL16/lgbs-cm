import { Component, OnInit , Inject } from '@angular/core';
import { Validators , FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.services';
import { first } from 'rxjs/operators';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'cs-root',
  templateUrl: './cs.component.html',
  styleUrls: ['./cs.component.scss']
})
export class CSComponent implements OnInit {
  title = 'cs';
  user: any;
 
  constructor(private dataService : DataService, private loadingScreen: LoadingComponent) {
    //dataService.getLoggedInName.subscribe(name => this.changeName(name));
   }
 
  ngOnInit() {
    this.user = this.dataService.isLoggedIn();
  }

}
