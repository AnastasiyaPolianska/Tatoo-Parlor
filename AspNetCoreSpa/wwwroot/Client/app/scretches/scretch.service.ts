import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IScretch } from './scretch';

@Injectable()
export class ScretchService {
    private _scretchUrl = 'api/Scretches/';

    constructor(private _http: Http) { }

    getScretches(): Observable<IScretch[]> {
        return this._http.get(this._scretchUrl)
            .map((response: Response) => <IScretch[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    addScretch(model: IScretch): Observable<any> {
        return this._http.post(this._scretchUrl, model).map(responce => responce.json());
    }

    setUserId(model: IScretch): Observable<any> {
        return this._http.post(this._scretchUrl + "SetId", model);
    }

    getScretchesForUser(): Observable<IScretch[]> {
        return this._http.get(this._scretchUrl +"ForUser")
            .map((response: Response) => <IScretch[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}