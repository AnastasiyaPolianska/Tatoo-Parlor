import { Component, ViewEncapsulation } from '@angular/core';
import { QuestionService } from '../shared/question.service';
import { IQuestionModel } from '../shared/questionModel';
import { Message } from 'primeng/primeng';
import { AuthService } from '../shared/auth.service';
import { IQuestion } from './question';

@Component({
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionsComponent {
    constructor(private _questionService: QuestionService, private _authService: AuthService) { };

    public Maintitle: string = 'Any extra questions?';
    public Description_part1: string = 'If you did not find your question in ';
    public Description_part2: string = ', ask your question right here! We will answer you in three days time.';
    public Insert: string = 'FAQ';
    public Subtitle: string = "Feedback form";

    public Points: string[] = ['Choose question category: ',
        'Enter question theme: ',
        'Enter your question: ']

    public Point2_placeholder: string = 'Enter question theme... ';
    public Point3_placeholder: string = 'Enter your question... ';
    public ButtonName: string = 'Send';
    public TableName: string = 'Asked questions';

    public Themes = ["Problems with account/web site",
        "Need additional info",
        "Errors on the page",
        "Your fresh idea",
        "Other"];

    public NumName = "№";
    public CategoryName = "Category";
    public ThemeName = "Theme";
    public QuestionName = "Question";
    public AnswerName = "Answer";

    public Num: number = 0;
    public Theme: string = "";
    public Message: string = "";
    public TempId: number;
    public Msgs: Message[] = [];

    public details: any;

    public Questions: IQuestion[];

    /*Sending the question to store in database*/
    SendQuestion(): void {
        if (this.Theme.length < 1 || this.Message.length < 1) {
            this.details = "Question was not send. Fill in all fields.";
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: this.details });
        }

        else {
            var category = "";

            switch (this.Num) {
                case 0: category = "Problems with account/web site";
                    break;
                case 1: category = "Need additional info";
                    break;
                case 2: category = "Errors on the page";
                    break;
                case 3: category = "Your fresh idea";
                    break;
                case 4: category = "Other";
                    break;
            }

            this._authService.getId().subscribe(data => {
                this.TempId = data; let tempModel: IQuestionModel = { Category: category, Theme: this.Theme, QuestionName: this.Message, CreatedBy: this.TempId };

                this._questionService.add(tempModel).subscribe(data => { }, err => {
                    this.Msgs.push({ severity: 'error', summary: 'Error', detail: err });
                });
            }, err => {
                this.Msgs.push({ severity: 'error', summary: 'Error', detail: err });
            });
        }
    }

    /*Executes on initialisation*/
    ngOnInit(): void {        
            this._questionService.getQuestions().subscribe(
                x => { this.Questions = x; });
        };
}