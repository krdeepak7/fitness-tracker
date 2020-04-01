import { CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { take } from 'rxjs/operators';

@Injectable()

export class AuthGuard implements CanLoad {

  constructor(
    private store: Store<fromRoot.State>
    ) {}

  canLoad(route: Route) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

}
