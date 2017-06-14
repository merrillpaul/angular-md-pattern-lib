# @pearson/angular-material
- Heavily uses angular flex laout - (https://github.com/angular/flex-layout)

## Installation

To install this library, run:
- remove all references in your project's package json to all angular material, hammerjs, d3, ngx-charts etc, and any flex layouts. Running the install command below adds all of this.

```bash
$ npm install @pearson/angular-material --save
```

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
-  angualr-cli json
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
### Application package.json
Add the following in your package json ( override angular version if needed), if you see a lot of `UNMET PEER DEPENDENCIES` error. This is because
from NPM v3.0 and higher , the auto installation of peer depencies is now a responsibility of the application developer. 

See here - 
- http://stackoverflow.com/questions/35207380/how-to-install-npm-peer-dependencies-automatically
- https://github.com/npm/npm/releases/tag/v3.0.0 ( Look at 'Breaking Changes' section)

```
"@angular/common": "^4.1.2",
        "@angular/animations": "^4.1.2",
        "@angular/core": "^4.1.2",
        "@angular/forms": "^4.1.2",
        "@angular/http": "^4.1.2",
        "@angular/router": "^4.1.2",
        "@angular/material": "2.0.0-beta.5",
        "@swimlane/ngx-charts": "^5.2.1",
        "ng2-toastr": "^4.0.1",
        "d3": "^4.6.0",
        "hammerjs": "^2.0.8",
        "highlight.js": "9.11.0",
        "showdown": "1.6.4",
        "web-animations-js": "2.2.2"
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
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
$ npm run publish
```

## License

TODO
