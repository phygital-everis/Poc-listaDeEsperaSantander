import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SimpleListComponent } from './components/simple-list/simple-list.component';
import { AngularFireModule } from "@angular/fire";
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule, FirestoreSettingsToken } from "@angular/fire/firestore";
import { AngularFireDatabase } from '@angular/fire/database';
import { AsyncPipe } from '@angular/common';
import { MessagingService } from './services/messaging-service.ts.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';

@NgModule({
  declarations: [
    AppComponent,
    SimpleListComponent
  ],
  imports: [
    BrowserModule,AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: AngularFireDatabase, useValue: {}, },
    MessagingService, AsyncPipe,AngularFireAuth,AngularFireMessaging
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
