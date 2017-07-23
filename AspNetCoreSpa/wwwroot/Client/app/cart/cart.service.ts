import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class CartService {
    private _cartUrl = 'api/Cart/';

    constructor(private _http: Http) { }

    addProductToCart(idProduct: number): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._cartUrl, idProduct, { headers: headers });
    }

    productIsInCart(idProduct: number): Observable<boolean> {
        return this._http.get(this._cartUrl + idProduct + "/isInCart")
            .map((response: Response) => <boolean>response.json());
    }

    getProductsInCart(): Observable<any> {
        return this._http.get(this._cartUrl)
            .map((response: Response) => <any> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteProduct(idProduct: number): Observable<any>
    {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._cartUrl + "delete", idProduct, { headers: headers });
    }

    deleteAll(): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._cartUrl + "deleteall", { headers: headers });
    }

    buyAll(): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._cartUrl + "buyall", { headers: headers });
    }

    changeAmount(id: number, amount: number): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._cartUrl + id + "/changeamount", amount, { headers: headers });
    }

    totalSum(): Observable<number> {
        return this._http.get(this._cartUrl + "totalsum")
            .map((response: Response) => <number>response.json());
    }

    totalAmount(): Observable<number> {
        return this._http.get(this._cartUrl + "totalamount")
            .map((response: Response) => <number>response.json());
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}