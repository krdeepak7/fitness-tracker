import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AngularFireAuth } from '@angular/fire/auth'
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()

export class AuthService {

  constructor(
    private router: Router, 
    private afAuth: AngularFireAuth, 
    private uiService: UIService,
    private store: Store<{ui: fromRoot.State}>
    ) { }

  initAuthListener(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated);
        this.router.navigate(['/training']);
      } else {
        this.store.dispatch(new Auth.SetUnAuthenticated);
        this.router.navigate(['/login']);
      }
    })
  }

  registerUser(authData: AuthData): void {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});
    this.store.dispatch(new UI.StartLoading);
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading);
      // console.log(result);
    }).catch(error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading);
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  login(authData: AuthData): void {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});
    this.store.dispatch(new UI.StartLoading);

    this.afAuth.signInWithEmailAndPassword(authData.email,authData.password)
    .then(result => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading);
      // console.log(result);
    }).catch(error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading);
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  logout(): void {
    this.afAuth.signOut();
  }

}
