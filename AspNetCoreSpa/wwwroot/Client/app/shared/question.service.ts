import { Injectable } from '@angular/core';
import { IQuestionModel } from '../shared/questionModel';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IQuestion } from '../questions/question';
import { Message } from 'primeng/primeng';

@Injectable()
export  class QuestionService {

    private _addUrl = 'api/Questions';
    private _answerUrl = 'api/Questions/answer';
    private _getQuestionsForUserUrl = 'api/Questions/GetQuestionsForUser/';
    private _getAllQuestions = 'api/Questions';

    constructor(private _http: Http) { }

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

    getAllQuestions(): Observable<IQuestion[]> {
        return this._http.get(this._getAllQuestions)
            .map((response: Response) => <IQuestion[]>response.json())
            .do(data => console.log('All:' + JSON.stringify(data)));
    }

    addanswer(answer: string, id: number): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._answerUrl, { answer: answer, id: id }, { headers: headers })
            .catch(err => {
                console.error(err);
                return Observable.throw(err.json()[0] || ' error');
            });;
    }
}