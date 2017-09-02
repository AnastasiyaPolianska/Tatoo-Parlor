import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './aboutus.component.html',
    styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
    public ArticleTitle: string = 'About us...';
    public ArticleText: string= 'Small, but cozy and inspiring place in the centre of city with its own atmosphere, friendly workers and attention to every client. Our tatoo parlor has something for everyone. The policy of "Tatooed Youth" is to make tatoos that will suite everyone. Get familiar with our personnel and their works!';
    
    public Age: string = 'Age: ';
    public Experience: string = 'Experience: ';
    public Education: string = 'Education: ';
    public SphereOfDrawings: string = 'Themes of drawings: ';

    public FirstMaster: string = 'Martha Bocharova';
    public FAgeValue: string = '22 years old.';
    public FExperienceValue: string = '4 years old.';
    public FEducationValue: string = "Bachelor's degree in arts.";
    public FSphereOfDrawingsValue: string = 'flowers, geometry.';
    public FDescription: string[] = [
        'Drawing plants is passion of Martha, it seems no artist could ever do it better. Dark and light graphics with composition of perfect lines make this work extremely inspiring. Was fulfilled from own her own scretch, took two sessions to finish. One of the first and best ones.',
        'Light leafs and easy lines make a perfect tatoo for a young lady. A scretch for this one was made in summer which is not too unexpected. Martha and her love to nature did their job well. Was fulfilled during one long session.',
        'Roses, drawn as if you are in a real bush of them - why not? Pretty and gripping tatoo that will not leave anyone undifferent. Fulfilled two years ago in five sessions and was corrected one time since then. The scretch was done by Martha and the client together. Cooperative work makes sense!',
        'Wonderfull flower that decorates the neck of a girl. Fullfilled two years ago in two sessions: a long and a short ones. Scretch was drawn by tatoo master and corrected by the client. Easy and pretty enough.'
        ]

    public SecondMaster: string = 'Asya Bondareva';
    public SAgeValue: string = '25 years old.';
    public SExperienceValue: string = '5 years old.';
    public SEducationValue: string = "Lviv colleague of arts.";
    public SSphereOfDrawingsValue: string = 'animals, geometry, fruits.';
    public SDescription: string[] = [
        'Drawing animals is passion of Asya, it seems no artist could ever do it better. Dark and light graphics with composition of perfect lines make this work extremely inspiring. Was fulfilled from own her own scretch, took three sessions to finish. One of the first and best ones.',
        'A re you afraid of spiders? This client obviously was not. Dark graphics makes sense if used originally. A bit scary, but still geniously fulfilled tatoo now decorates one shoulder and inspires someone.',
        'Leafs, drawn as if you are in a real bush of them - why not? Pretty and gripping tatoo that will not leave anyone undifferent. Fulfilled two years ago in five sessions and was corrected one time since then. The scretch was done by Asya and the client together. Cooperative work makes sense!',
        'Light and easy lines make a perfect tatoo for a young lady. A scretch for this one was made in summer which is not too unexpected. Asya and her love to nature did their job well. Was fulfilled during one long session.'
    ]

    public ngOnInit(): void {
        window.scroll(0, 0);
    }
}