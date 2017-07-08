"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AboutusComponent = (function () {
    function AboutusComponent() {
        this.articleTitle = 'About us...';
        this.articleText = 'Small, but cozy and inspiring place in the centre of city with its own atmosphere, friendly workers and attention to every client. Our tatoo parlor has something for everyone. The policy of "Tatooed Youth" is to make tatoos that will suite everyone. Get familiar with our personnel and their works!';
        this.Age = 'Age: ';
        this.Experience = 'Experience: ';
        this.Education = 'Education: ';
        this.SphereOfDrawings = 'Themes of drawings: ';
        this.FirstMaster = 'Martha Bocharova';
        this.FAgeValue = '22 years old.';
        this.FExperienceValue = '4 years old.';
        this.FEducationValue = "Bachelor's degree in arts.";
        this.FSphereOfDrawingsValue = 'flowers, geometry.';
        this.FDescription = [
            'Drawing plants is passion of Martha, it seems no artist could ever do it better. Dark and light graphics with composition of perfect lines make this work extremely inspiring. Was fulfilled from own her own scretch, took two sessions to finish. One of the first and best ones.',
            'Light leafs and easy lines make a perfect tatoo for a young lady. A scretch for this one was made in summer which is not too unexpected. Martha and her love to nature did their job well. Was fulfilled during one long session.',
            'Roses, drawn as if you are in a real bush of them - why not? Pretty and gripping tatoo that will not leave anyone undifferent. Fulfilled two years ago in five sessions and was corrected one time since then. The scretch was done by Martha and the client together. Cooperative work makes sense!',
            'Wonderfull flower that decorates the neck of a girl. Fullfilled two years ago in two sessions: a long and a short ones. Scretch was drawn by tatoo master and corrected by the client. Easy and pretty enough.'
        ];
        this.SecondMaster = 'Asya Bondareva';
        this.SAgeValue = '25 years old.';
        this.SExperienceValue = '5 years old.';
        this.SEducationValue = "Lviv colleague of arts.";
        this.SSphereOfDrawingsValue = 'animals, geometry, fruits.';
        this.SDescription = [
            'Drawing animals is passion of Asya, it seems no artist could ever do it better. Dark and light graphics with composition of perfect lines make this work extremely inspiring. Was fulfilled from own her own scretch, took three sessions to finish. One of the first and best ones.',
            'A re you afraid of spiders? This client obviously was not. Dark graphics makes sense if used originally. A bit scary, but still geniously fulfilled tatoo now decorates one shoulder and inspires someone.',
            'Leafs, drawn as if you are in a real bush of them - why not? Pretty and gripping tatoo that will not leave anyone undifferent. Fulfilled two years ago in five sessions and was corrected one time since then. The scretch was done by Asya and the client together. Cooperative work makes sense!',
            'Light and easy lines make a perfect tatoo for a young lady. A scretch for this one was made in summer which is not too unexpected. Asya and her love to nature did their job well. Was fulfilled during one long session.'
        ];
    }
    return AboutusComponent;
}());
AboutusComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/about_us/aboutus.component.html',
        styleUrls: ['app/about_us/aboutus.component.css']
    })
], AboutusComponent);
exports.AboutusComponent = AboutusComponent;
//# sourceMappingURL=aboutus.component.js.map