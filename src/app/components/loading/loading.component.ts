import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.services';
import { first } from 'rxjs/operators';

@Component({
    selector: 'load-root',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
    title = 'loading';

    
    loadView: boolean = false;

    constructor(private dataService: DataService, private router: Router) {
        dataService.getLoadingEvent.subscribe(load => this.LoadViewController(load));
        
    }

    LoadViewController(load:boolean): void{
        if(load)
            this.loadView = true;
        else
            this.loadView = false;
    }
    ngOnInit(): void {


    }

}