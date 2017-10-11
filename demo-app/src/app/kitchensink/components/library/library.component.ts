import { Component, OnInit } from '@angular/core';

import { slideInDownAnimation } from 'app/app.animations';
import { MatSnackBar, MatDialog } from '@angular/material';


@Component({
  selector: 'kitchen-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  animations: [slideInDownAnimation]
})
export class LibraryComponent implements OnInit {

  isDisabled: boolean = false;
  isIndeterminate: boolean = false;
  favoriteSeason: string = 'Autumn';
  selectedValue: string;
  color: string;
  alwaysVisible: boolean = false;

  toggleDiv: boolean = true;
  fadeDiv: boolean = true;

  toggle(): void {
    this.toggleDiv = !this.toggleDiv;
  }
  fade(): void {
    this.fadeDiv = !this.fadeDiv;
  }

  seasonOptions: string[] = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn',
  ];

  chips: Object = [
    { name: 'Default', color: '', selected: false },
    { name: 'Default (selected)', color: '', selected: true },
    { name: 'Primary (selected)', color: 'primary', selected: true },
    { name: 'Accent (selected)', color: 'accent', selected: true },
    { name: 'Warn (selected)', color: 'warn', selected: true },
    { name: 'Success (selected)', color: 'success', selected: true },
    { name: 'Secondary (selected)', color: 'secondary', selected: true },
  ];

  seasons = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn',
  ];

  user: any = {
    agreesToTOS: false,
  };

  groceries: Object[] = [{
    bought: true,
    name: 'Gobi Manchurian',
  }, {
    bought: false,
    name: 'Steak Sauce',
  }, {
    bought: false,
    name: 'Organic Eggs',
  },
  ];

  todos: Object[] = [{
    finished: true,
    name: 'Create Assessment',
  }, {
    finished: true,
    name: 'Remove bad user',
  }, {
    finished: false,
    name: 'Send WIAT3 to Bruce Willis',
  }, {
    finished: false,
    name: 'Allow customer service screen',
  }, {
    finished: false,
    name: 'Blog our pattern library',
  }, {
    finished: false,
    name: 'Take a vacation',
  }
  ];

  messages: Object[] = [{
    from: 'Ali Connors',
    message: 'I will be in your neighborhood',
    photo: 'https://api.adorable.io/avatars/40/1.png',
    subject: 'Brunch this weekend?',
  }, {
    from: 'Trevor Hansen',
    message: 'Wish I could but we have plans',
    photo: 'https://api.adorable.io/avatars/40/2.png',
    subject: 'Re: Brunch this weekend?',
  }, {
    from: 'Sandra Adams',
    message: 'Do you have Paris recommendations instead?',
    photo: 'https://api.adorable.io/avatars/40/3.png',
    subject: 'Re: Brunch this weekend?',
  },
  ];

  products: Object = [
    {value: 'wiat-3', viewValue: 'WIAT - III'},
    {value: 'wisc-5', viewValue: 'WISC - V'},
    {value: 'ktea-3-form-a', viewValue: 'KTEA -3 - FormA'},
  ];

  systems: Object[] = [{
    name: 'Assess',
    on: false,
    color: 'primary',
  }, {
    name: 'Manual',
    on: true,
    color: 'accent',
  }, {
    name: 'Email',
    on: true,
    color: 'warn',
  },
  ];

  dogs: Object[] = [
    { name: 'Porter', human: 'Kara' },
    { name: 'Mal', human: 'Jeremy' },
    { name: 'Koby', human: 'Igor' },
    { name: 'Razzle', human: 'Ward' },
    { name: 'Molly', human: 'Rob' },
    { name: 'Husi', human: 'Matias' },
  ];

  house: any = {
    lockHouse: false,
  };

  // Autocomplete
  currentState: string = '';

  reactiveStates: any;
  tdStates: any[];

  tdDisabled: boolean = false;

  states: Object[] = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' },
  ];


  /// dynamic forms
   dynamicFormsAttrs: any[] = [{
    description: `JS Object that will render the elements depending on its config.
                  [name] property is required.`,
    name: 'elements',
    type: 'ITdDynamicElementConfig[]',
  }, {
    description: `Getter property for dynamic [FormGroup].`,
    name: 'form',
    type: 'get(): FormGroup',
  }, {
    description: `Getter property for [valid] of dynamic [FormGroup].`,
    name: 'valid',
    type: 'get(): boolean',
  }, {
    description: `Getter property for [value] of dynamic [FormGroup].`,
    name: 'value',
    type: 'get(): any',
  }, {
    description: `Getter property for [errors] of dynamic [FormGroup].`,
    name: 'errors',
    type: 'get(): {[name: string]: any}',
  }, {
    description: `Getter property for [controls] of dynamic [FormGroup].`,
    name: 'controls',
    type: 'get(): {[key: string]: AbstractControl}',
  }];

  
  //////////////////

  constructor(private _snackBarService: MatSnackBar,
    public dialog: MatDialog) {
    this.tdStates = this.states;
  }

  ngOnInit() {
  }
  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.name : value;
  }

  filterStates(val: string): Object[] {
    return val ? this.states.filter((s: any) => s.name.match(new RegExp(val, 'gi'))) : this.states;
  }

  showSnackBar(): void {
    this._snackBarService.open('Message', 'Action', { duration: 3000 });
  }

  /*(openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '60%',
    });
  }*/

}


