import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeechRecorderComponent } from './speech-recorder/speech-recorder.component';
import { FormsModule } from '@angular/forms';
import { SpeechRecorder2Component } from './speech-recorder2/speech-recorder2.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeechRecorderComponent,
    SpeechRecorder2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
