import { Component } from '@angular/core';

@Component({
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

    public ArticleTitle: string = "Our contacts";
    public ArticleText: string = "You can contact us on email, phone, whatsapp or social netwotks' accounts. Always ready to answer your questions and help!";

    public EmailLabel: string = "Email: ";
    public PhoneLabel: string = "Phone & whatsapp: ";
    public InstagramLabel: string = "Instagram: ";
    public TwitterLabel: string = "Twitter: ";
    public VkLabel: string = "Vkontakte: ";

    public Email: string = "tatooedyouth@gmail.com";
    public Phone: string = "+ 380958268932";
    public Instagram: string = "https://www.instagram.com/martha_bocharova";
    public Twitter: string = "https://www.pinterest.com/pin/542754192577200718";
    public Vk: string = "https://vk.com/id20028415";

    public Lat: number = 49.8401751;
    public Lng: number = 24.0237981;
}