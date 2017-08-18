"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WelcomeComponent = (function () {
    function WelcomeComponent() {
        this.pageTitle = 'Tatooed youth';
        this.subTitle = 'Tatoo parlor';
        this.articleTitle = 'About us...';
        this.articleText = 'We are ready to offer you a lot of great tatoos made from individual scretches by our talented artists. Read more about "Tatooed youth" and get familiar with artists and their works ';
        this.startwithTitle = 'Do not know what to start with?';
        this.startwithText1 = 'If you are new to a tatoo industry, first of all get familiar with our tatoo masters and the best of their works right ';
        this.startwithText2 = ' If you are ready to start the tatooing process, you can choose your individual scratch or draw your own on ';
    }
    return WelcomeComponent;
}());
WelcomeComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/home/welcome.component.html',
        styleUrls: ['app/home/welcome.component.css']
    })
], WelcomeComponent);
exports.WelcomeComponent = WelcomeComponent;
//# sourceMappingURL=welcome.component.js.map