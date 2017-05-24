import { NgModule } from '@angular/core';


import { PearsonMessageModule } from './message/message.module';
export * from './message/message.module';

import { PearsonBadgeModule } from './badge/badge.module';
export * from './badge/badge.module';

@NgModule({
    imports: [
        PearsonMessageModule,
        PearsonBadgeModule
    ],
    exports: [
        PearsonMessageModule,
        PearsonBadgeModule
    ],
    declarations: [],
    providers: [],
})
export class PearsonNotificationsModule { }

