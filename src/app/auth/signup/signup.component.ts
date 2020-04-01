import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy {

  maxDate;
  // isLoading: boolean = false;
  private loadingSubscription: Subscription;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService, 
    private uiService: UIService, 
    private store: Store<fromRoot.State>
     ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSubscription = this.uiService.loadingStateChanged
    // .subscribe(isLoading => this.isLoading = isLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm): void {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
  
}
