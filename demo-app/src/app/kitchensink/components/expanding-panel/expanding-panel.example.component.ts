import { Component } from '@angular/core';

import { slideInDownAnimation } from 'app/app.animations';


@Component({
  selector: 'expanding-panel-demo',
  templateUrl: './expanding-panel.example.component.html',
  animations: [slideInDownAnimation],
})
export class ExpandingPanelExampleComponent {

 

  expandCollapseExpansion1Msg: string = 'No expanded/collapsed detected yet';
  expansion1: boolean = false;
  disabled: boolean = false;

  toggleExpansion1(): void {
    if (!this.disabled) {
      this.expansion1 = !this.expansion1;
    }
  }

  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  expandExpansion1Event(): void {
    this.expandCollapseExpansion1Msg = 'Expand event emitted.';
  }

  collapseExpansion1Event(): void {
    this.expandCollapseExpansion1Msg = 'Collapse event emitted.';
  }
}