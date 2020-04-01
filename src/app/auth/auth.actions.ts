import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[UI] Set Authenticated';
export const SET_UNAUTHENTICATED = '[UI] Set UnAuthenticated';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnAuthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnAuthenticated;
