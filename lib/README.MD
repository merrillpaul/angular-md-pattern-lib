# @pearson/angular-material
- Heavily uses angular flex layout - (https://github.com/angular/flex-layout)

## Installation

To install this library, run:

```bash
$ npm install @pearson/angular-material --save
```

### Application package.json
Ideally your application package.json should have only
```
  "dependencies": {
    "@pearson/angular-material": "^1.0.1",
    "core-js": "^2.4.1",
    "rxjs": "^5.4.0",
    "zone.js": "^0.8.10"
  },
  "devDependencies": {
    "@angular/cli": "^1.4.2",    
    "@angular/compiler": "5.0.0-rc.1",
    ..
```
Look here for an example package.json -> https://github.com/pearca/pearson-angular-md-pattern-lib/blob/master/demo-app/package.json. 
That is, no reference to angular or angular-material packages. These would be resolved by the @pearson/angular-material package.

### Add theme css and iscroll in .angular-cli.json
Add the theme css file in your angular cli json as shown below:-
```
"styles": [
        .... other scss/css files,
        "../node_modules/@pearson/angular-material/theming/pearson-material.css"
      ],
"scripts": [
      "../node_modules/iscroll/build/iscroll.js"
    ],     
```      

### Alternate way to get the themes
We can add the original SCSS files into the app so that we get access to the theme variable, mixins, color palettes etc. 
For example the end app developer can access the themes using
`$peason_light_theme: get_pearson_light_theme();`

To accomplish this, update your .angular-cli.json:
-  angular-cli json
```
"styles": [
        "styles.scss"       
      ],
      "scripts": [
        "../node_modules/iscroll/build/iscroll.js"
      ],
      "stylePreprocessorOptions": {
        "includePaths": [          
          "../node_modules/@pearson/angular-material/theming"                   
        ]
      },
``` 
- your main scss ( styles.scss in this example )
* Add the pearson scss as the first line
```
@import '~@pearson/angular-material/theming/pearson-material';
```

Now you can reuse any mixins in your scss file.

For example if you want to call the `material-icon-pseudo` mixin from styles/_mixins.scss in a component.scss just include the import statement relative to @pearson/angular-material/theming.
Like:-

```
@import 'pearson-theme';

.some-class {
  :after {
    @include material-icon-pseudo("check"); 
    @include pearson_color(success);
  }
}
```


### Applying the Module


```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import the library
import { PearsonMaterialModule } from '@pearson/angular-material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    PearsonMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, services,  directives and pipes in your Angular application:


## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

To publish to npm registry
```bash
$ npm run npm-publish
```

## License

TODO


## Issues:
-  FIXED ! angular/compiler-cli is still at 4.1.3 due to https://github.com/angular/angular/issues/17171 - FIXED with 5.0.0
- http://codetunnel.io/you-can-finally-npm-link-packages-that-contain-peer-dependencies/
- JIT needs `ng serve --preserve-symlinks -o` 
- https://github.com/angular/angular-cli/issues/7409