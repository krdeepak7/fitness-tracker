import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AngularFireModule } from '@angular/fire';

import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { UIService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';

@NgModule({
  
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthModule,
    StoreModule.forRoot(reducers)
    ],

  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent],

})
export class AppModule { }
