import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SimpleListComponent } from './components/simple-list/simple-list.component';
import { AngularFireModule } from "@angular/fire";
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule, FirestoreSettingsToken } from "@angular/fire/firestore";

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
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
