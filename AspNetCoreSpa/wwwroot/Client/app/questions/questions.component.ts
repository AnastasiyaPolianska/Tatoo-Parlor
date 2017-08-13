import { Component, ViewEncapsulation, OnInit } from '@angular/core';
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
export class QuestionsComponent implements OnInit {
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

    public ThemeOK: boolean = true;
    public ToolTheme: string = "*Use from 10 to 200 symbols.";
    public ToolErrorTheme: string;

    public MessageOK: boolean = true;
    public ToolMessage: string = "*Use from 50 to 300 symbols.";
    public ToolErrorMessage: string;

    public Num: number = 0;
    public Theme: string = "";
    public Message: string = "";
    public TempId: number;
    public Msgs: Message[] = [];

    public details: any;

    public Questions: IQuestion[];

    /*Sending the question to store in database*/
    SendQuestion(): void {
        this.ThemeOK = true;
        this.MessageOK = true;

        if (this.Theme.length < 10 || this.Theme.length > 200) {
            this.ThemeOK = false;
            this.ToolErrorTheme = "*Invalid length: use from 10 to 200 symbols.";
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while sending the question: use from 10 to 200 symbols in theme field" });
        }

        if (this.Message.length < 50 || this.Message.length > 300) {
            this.MessageOK = false;
            this.ToolErrorMessage = "*Invalid length: use from 50 to 300 symbols.";
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while sending the question: use from 50 to 300 symbols in question field" });
        }

        else {
            var cat = "";

            switch (this.Num) {
                case 0: cat = "Problems with account/web site";
                    break;
                case 1: cat = "Need additional info";
                    break;
                case 2: cat = "Errors on the page";
                    break;
                case 3: cat = "Your fresh idea";
                    break;
                case 4: cat = "Other";
                    break;
            }

            this._authService.getId().subscribe(data => {
                this.TempId = data; let tempModel: IQuestionModel = { Category: cat, Theme: this.Theme, QuestionName: this.Message, CreatedBy: this.TempId, Answer: "" };

                this._questionService.add(tempModel).subscribe(data => {
                    this.Msgs.push({ severity: 'success', summary: 'Success', detail: "Question sent successfully. We will answer as fast as possible." });
                    let toAdd: IQuestion = { category: cat, theme: this.Theme, questionName: this.Message, createdBy: this.TempId, answer: "" };
                    this.Questions.push(toAdd);
                },
                    err => {
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

    Answer(question: IQuestion): string {
        if (question.answer == "") return "Not answered yet. We will answer as fast as possible.";
        else return question.answer;
    }
}