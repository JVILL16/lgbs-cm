import { Component } from '@angular/core';
import { DataService } from './services/data.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lgbs-cm';
  loadBackground : boolean = false;
  blurBackground : boolean = false;
  constructor(private dataService: DataService){
    dataService.getLoadingEvent.subscribe(load => this.loadBackground = load);
    dataService.getEmailCodeScreen.subscribe(blur=> this.blurBackground = blur);    
    localStorage.clear();
  }
}
