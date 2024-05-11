import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeechRecorderComponent } from './speech-recorder/speech-recorder.component';
import { FormsModule } from '@angular/forms';
import { SpeechRecorder2Component } from './speech-recorder2/speech-recorder2.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/auth.interceptor';

const MAT_MODULES = [
  MatInputModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    AppComponent,
    SpeechRecorderComponent,
    SpeechRecorder2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ...MAT_MODULES
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
