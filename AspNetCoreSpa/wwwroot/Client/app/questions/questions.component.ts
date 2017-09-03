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
    
    public Themes = ["Problems with account/web site",
        "Need additional info",
        "Errors on the page",
        "Your fresh idea",
        "Other"];

    public ThemeOK: boolean = true;
    public ToolTheme: string = "*Use from 10 to 200 characters.";
    public ToolErrorTheme: string;

    public MessageOK: boolean = true;
    public ToolMessage: string = "*Use from 50 to 300 characters.";
    public ToolErrorMessage: string;

    public Num: number = 0;
    public Theme: string = "";
    public Message: string = "";
    public TempId: number;
    public Msgs: Message[] = [];

    public details: any;

    public Questions: IQuestion[];
    public AllQuestions: IQuestion[];

    public TableName: string = 'Asked questions';

    public CategoryName = "Category";
    public ThemeName = "Theme";
    public QuestionName = "Question";
    public AnswerName = "Answer";

    public LableForCategory = "My questions";
    public TitleLableForCategory = "Click to switch to all questions and start answering";

    public isAdminPage = false;
    public Checked: boolean = true;

    public TitleSendQuestion: string = "Click to send question";
    public TitleSendAnswer: string = "Click to send answer";
    public AnswersOK: boolean[];
    public AllQuestionsLength: number;
    public AnswerPlaceholder: string = "Enter your answer...";
    public ToolAnswer: string = "*Use from 50 to 300 characters.";
    public ToolErrorAnswer: string = "*Invalid length: use from 50 to 300 characters.";

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
            if (this.ThemeOK && this.MessageOK)
            {
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
                        this.Initializer();
                    },
                        err => {
                            this.Msgs.push({ severity: 'error', summary: 'Error', detail: err });
                        });
                }, err => {
                    this.Msgs.push({ severity: 'error', summary: 'Error', detail: err });
                });
            }          
        }
    }

    /*Executes on initialisation*/
    ngOnInit(): void {
        window.scroll(0, 0);

        this.AnswersOK = [];
        this.Initializer();

        if (this._authService.IsAdmin) {
            this.Checked = true;
            this.OnChange();
        }

        else this.Checked = false;
    };


    Initializer(): void {
        this._questionService.getQuestions().subscribe(
            x => { this.Questions = x; });

        this._questionService.getAllQuestions().subscribe(
            x => {
                this.AllQuestions = x;
                this.AllQuestionsLength = x.length;
                this.AnswersOK.length = this.AllQuestionsLength;

                for (var i = 0; i < this.AllQuestionsLength; i++)
                    this.AnswersOK[i] = true;
            });
    }

    Answer(question: IQuestion): string {
        if (question.answer == "") return "Not answered yet. We will answer as fast as possible.";
        else return question.answer;
    }

    OnChange() {
        this.isAdminPage = !this.isAdminPage;

        if (!this.isAdminPage) {
            this.LableForCategory = "My questions";
            this.TitleLableForCategory = "Click to switch to all questions and start answering";
        }

        if (this.isAdminPage) {
            if (this._authService.IsAdmin) {
                this.LableForCategory = "Unanswered questions";
                this.TitleLableForCategory = "Click to switch to my questions page";
            }
        }

        this.Initializer();
    }

    AnswerQuestion(questionId: number): void {
        var idx = this.AllQuestions.findIndex(x => x.id == questionId);

        this.AnswersOK[idx] = true;

        if (this.AllQuestions[idx].answer.length < 50 || this.AllQuestions[idx].answer.length > 300) {
            this.Msgs.push({ severity: 'error', summary: 'Error', detail: "Error while sending the answer: use from 50 to 300 symbols in answer field" });
            this.AnswersOK[idx] = false;
        }

        else {
            this.Msgs.push({ severity: 'success', summary: 'Success', detail: "Question answered successfully." });

            this._questionService.addanswer(this.AllQuestions[idx].answer, this.AllQuestions[idx].id).subscribe(
                data => {
                    this.Initializer();
                });
        }
    }
}