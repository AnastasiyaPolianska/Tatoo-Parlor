import { Component} from '@angular/core';

@Component({
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss']
})
export class HelpComponent {
    public Maintitle: string = 'Frequently Asked Questions';

    public Description: string = 'If you have any questions about the tatoos or making them, if you are new to this sphere and do not imagine what to start with - find answers on this page, dispel myths and learn info about tatoos!';

    public Points: string[] = [
        'Does getting a tatoo hurt?',
        'How much does it cost to get a tattoo?',
        'How do I care for my new tattoo ?',
        'Will it fade?',
        'Can I bring my own design?',
        'Can you fix my old tattoo?',
        'Is it safe to get a tattoo?',
        'Summary',
        'Any extra questions?'
    ];

    public Here: string = 'here';
    public Shop: string = 'on-line shop';
    public Scretches: string = 'scretches';
    public Page: string = 'this page';

    public Theme1: string = 'YES! Receiving a tattoo is a painful process. It requires the application of pigment under the first epidermal layer of the skin. The larger the tattoo the longer it will take to do, so small tattoos hurt less than large ones! But remember, people would not get a second tattoo if the first one hurt that bad.Do not be a sissy!';
    public Theme2: string = 'The cost varies on the size of your tattoo, the complexity, and where you put it on your body. Our prices start at $30.00 and go up from there.';
    public Theme3: string = 'Your tatoo is being put auder strict sanitary conditions. Keep it clean and follow these instructions:';
    public Theme3_item1: string = 'Leave bandage on for 5- 6 hours.';
    public Theme3_item2: string = 'Remove bandage, wash with warm water & soap, pat dry.';
    public Theme3_item3: string = 'Never bandage again.';
    public Theme3_item4: string = 'Before scab forms apply NEOSPORIN 3 or 4 times daily.';
    public Theme3_item5: string = 'Stay out of chlorine pools, salt water, and only minimum sun exposure while tattoo is healing.';
    public Theme3_item6: string = 'Do not pick at scab. Tattoos will heal in 10-15 days.';
    public Theme4: string = 'The Tattooed Youth uses the highest quality pigments found in the industry. These pigments are not cheap and not easy to find. The reason we have been able to stay in business for so long is because we use nothing but the best. Our work is guaranteed to stay bright and sharp forever.';
    public Theme5: string = 'Just about any design you can think of can be made into a beautiful Tattoo Factory tattoo. You are more than welcome to bring in your own design or pick one of our hundreds of thousands of designs that line our walls. If you already know what you want, great, it is very simple to convey your idea to our artists. The easiest way is with a picture. It does nott matter what the picture is on (keychain, t-shirt, book, drawing...etc.). Even if you can not draw, our guys still love to do the custom work. Just describe it well or even bring in a stick drawing. We can turn it into your dream tattoo on paper right before your eyes! Besides, you can choose your individual scretch ';
    public Theme6: string = "Old tattoos can be easily reworked into a fresh work of art. Color can be added to brighten your existing tattoo or with a little creativity even turned into a completely new (although larger) tattoo. There's no use in going through life with 'Susan' tattooed on your arm if you love 'Pam'. Thanks to the modern possibilities of the Tattooed Youth experience, it can all be corrected.Why wait? We fix other tattoo shop's mistakes every day!";
    public Theme7: string = 'A Tattoo Youth tattoo is put on under the strictest of sanitary conditions. We use a totally disposable tattoo system! Every instrument is new before going into a high pressure, high temperature autoclave for approximately one hour. Everything is disposed of after every tattoo, and the entire area sanitized. Our procedure consists of individually wrapped instruments that are only opened in front of you. (If you choose to go somewhere else, insist on this same procedure.)';
    public Theme8_part1: string = 'So, you can get familiar with us ';
    public Theme8_part2: string = ' or find more about our artists and there works ';
    public Theme8_part3: string = '. You have a chance to buy cool tatoo products at our ';
    public Theme8_part4: string = ' and get familiar with available ';
    public Theme9: string = 'You can write us and ask them just now! Write us a massage on ';
}