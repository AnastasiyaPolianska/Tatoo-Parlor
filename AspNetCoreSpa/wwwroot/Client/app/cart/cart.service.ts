import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IProduct } from '../products/product';

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

    /*getProducts(): Observable<IProduct[]> {
        return this._http.get(this._productUrl)
            .map((response: Response) => <IProduct[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getProduct(id: number): Observable<IProduct> {
        return this._http.get(this._productUrl+id)
            .map((response: Response) => response.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }*/
}