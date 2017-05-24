import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { ObservableMedia, MediaChange, BreakPointRegistry } from '@angular/flex-layout';

@Injectable()
export class MediaQueryService {

    private _mediaQueries: { [key: string]: Observable<boolean> } = {};
    private _mediaQuerySources: { [key: string]: Subject<boolean> } = {};
    private _mediaObservable: Observable<MediaChange>;

    constructor(
        private _media: ObservableMedia,
        private _breakpoints: BreakPointRegistry
    ) {
        this._media.asObservable().subscribe((change: MediaChange) => this._observeChange(change));
    }

    public query(query: string): boolean {
        return this._media.isActive(query);
    }

    public observeFor(query: string): Observable<boolean> {
        if (!this._mediaQuerySources[query]) {
            this._mediaQuerySources[query] = new Subject<boolean>();
            this._mediaQueries[query] = this._mediaQuerySources[query].asObservable();
            
            // TODO init the value if its on initially
        }
        return this._mediaQueries[query];
    }

    private _observeChange(change: MediaChange): void {
        this._evaluateChange(change.mediaQuery);
    }

    private _evaluateChange(mediaQuery: string): void {

        let aliasMap = this._breakpoints
            .aliases
            .map(alias => { return { alias: alias, on: this._media.isActive(alias) } });

        let toFireAliases: string[] = aliasMap.filter(it => it.on).map(it => it.alias);

        Object
            .keys(this._mediaQuerySources)
            .filter(key => {
                return toFireAliases.indexOf(key) === -1;
            })
            .forEach(key => this._mediaQuerySources[key].next(false));

        toFireAliases.forEach(query =>
            this._mediaQuerySources[query] && this._mediaQuerySources[query].next(true)
        );
    }
}