import { Injectable } from '@angular/core';
import { ISingUpModel } from './singUpModel';
import { ILogInModel } from './logInModel';
import { Observable } from 'rxjs/Observable';
import { LocalStorage, SessionStorage } from 'h5webstorage';
import { Http, Response } from '@angular/http';

@Injectable()
export  class AuthService {

    private _signUpUrl = 'api/Account/register';
    private _logInUrl = 'api/Account/login';
    private _logOutUrl = 'api/Account/logout';
    private _idUrl = 'api/Profile/id';
    private _userUrl = 'api/Profile/username';

    constructor(private _http: Http, private localStorage: LocalStorage, private sessionStorage: SessionStorage) { }

    signUp(model: ISingUpModel): Observable<any> {
        return this._http.post(this._signUpUrl, model);
    }

    logIn(model: ILogInModel): Observable<any> {
        return this._http.post(this._logInUrl, model)
            .map(res => {
                if (model.rememberMe) {
                    this.localStorage.setItem('localAuthData', model.email);
                    
            }
                else this.sessionStorage.setItem('sessionAuthData', model.email);
    })
            .catch(err => {
                console.error(err);
                return Observable.throw(err.json()[0] || ' error');
            });
    }

    getId(): Observable<number> {
        return this._http.get(this._idUrl).map((response: Response) => <number>response.json())
    }

    getUser(): Observable<any> {
        return this._http.get(this._userUrl).map((response: Response) =>response.json());
    }

    logOut(): Observable<any> {
        return this._http.post(this._logOutUrl, {})
            .map(res => {
                this.localStorage.setItem('localAuthData',"");
                this.sessionStorage.setItem('sessionAuthData',"");
            })
    }
}