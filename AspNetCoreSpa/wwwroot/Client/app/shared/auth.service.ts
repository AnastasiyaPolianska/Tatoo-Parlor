import { Injectable } from '@angular/core';
import { ISingUpModel } from './singUpModel';
import { ILogInModel } from './logInModel';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class AuthService {

    private _signUpUrl = 'api/Account/register';
    private _logInUrl = 'api/Account/login';
    private _logOutUrl = 'api/Account/logout';
    private _changeFirstNameUrl = 'api/Profile/changefirstname';
    private _changeLastNameUrl = 'api/Profile/changelastname';
    private _changeEmailUrl = 'api/Profile/changeemail';
    private _changePasswordUrl = 'api/Profile/changepassword';
    private _idUrl = 'api/Profile/id';
    private _userUrl = 'api/Profile/username';
    private _userExist = 'api/Profile/userexist';

    public IsLoggedIn: boolean = false;
    public CurrentUserEmail: string;
    public IsAdmin: boolean = false;

    constructor(private _http: Http) { }

    signUp(model: ISingUpModel): Observable<any> {
        return this._http.post(this._signUpUrl, model).catch(err => {
            console.error(err);
            return Observable.throw(err.json()[0] || ' error');
        });
    }

    logIn(model: ILogInModel): Observable<any> {
        return this._http.post(this._logInUrl, model)
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
        this.IsLoggedIn = false;
        this.CurrentUserEmail = "";
        return this._http.post(this._logOutUrl, {});
    }

    changeFirstName(newFirstName: string): Observable<any> {
        return this._http.get(this._changeFirstNameUrl+"/"+newFirstName);
    }

    changeLastName(newLastName: string): Observable<any> {
        return this._http.get(this._changeLastNameUrl + "/" + newLastName);
    }

    changeEmail(newEmail: string, password: string): Observable<string> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._changeEmailUrl, { newEmail: newEmail, password: password }, { headers: headers })
            .map((response: any) => { console.log(response); return <string>response._body; })
            .catch(err => {
                console.error(err);
                return Observable.throw(err.json()[0] || ' error');
        });
    }

    changePassword(newPasword: string, password: string, emailToFind: string = ""): Observable<string> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._changePasswordUrl, { newPassword: newPasword, password: password, emailToFind: emailToFind }, { headers: headers })
            .map((response: any) => { console.log(response); return <string>response._body; })
            .catch(err => {
                console.error(err);
                return Observable.throw(err.json()[0] || ' error');
            });
    }

    userExist(email: string): Observable<any> {
        return this._http.get(this._userExist + "/" + email);
    }
}