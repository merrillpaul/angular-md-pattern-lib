import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'psn-menu',
    templateUrl: './menu.component.html',
    styleUrls: [
        './menu.component.scss'
    ],
    host: {
    '[class.psn-menu]': 'true'
    }
})

export class PearsonMenuComponent {
    constructor() { }
    
}