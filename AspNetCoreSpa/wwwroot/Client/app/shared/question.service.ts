import { Injectable } from '@angular/core';
import { IQuestionModel } from '../shared/questionModel';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorage, SessionStorage } from 'h5webstorage';
import { IQuestion } from '../questions/question';
import { Message } from 'primeng/primeng';

@Injectable()
export  class QuestionService {

    private _addUrl = 'api/Questions';
    private _getQuestionsForUserUrl = 'api/Questions/GetQuestionsForUser/';

    constructor(private _http: Http, private localStorage: LocalStorage, private sessionStorage: SessionStorage) { }

    public tempId: number;
    public msgs: Message[] = [];

    add(model: IQuestionModel): Observable<any> {
        return this._http.post(this._addUrl, model);
    }

    getQuestions(): Observable<IQuestion[]> {
        return this._http.get(this._getQuestionsForUserUrl)
            .map((response: Response) => <IQuestion[]>response.json())
            .do(data => console.log('All:' + JSON.stringify(data)));
    }
}