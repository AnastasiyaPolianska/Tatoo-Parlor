import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';

@Component({
    templateUrl: './adminpage.component.html',
    styleUrls: ['./adminpage.component.scss']
})
export class AdminpageComponent 
{
    constructor(private _authService: AuthService,
                private _router: Router) { };

    /*Executes on initialisation of page*/
    public ngOnInit() {

    }
}