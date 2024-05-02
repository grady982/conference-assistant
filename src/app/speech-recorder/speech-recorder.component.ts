import { ChangeDetectorRef, Component } from '@angular/core';
declare var window: any;

@Component({
  selector: 'app-speech-recorder',
  templateUrl: './speech-recorder.component.html',
  styleUrls: ['./speech-recorder.component.scss']
})
export class SpeechRecorderComponent {

  recognition: any;
  isRecording: boolean = false;
  recordedText: string = '';

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
  }

  startRecording() {
    this.isRecording = true;
    this.recognition.start();

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;

      console.log('on result', transcript);
      this.recordedText += transcript;
      this.changeDetectorRef.detectChanges();
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };

    this.recognition.onend = () => {
      this.isRecording = false;
    };
  }

  stopRecording() {
    this.recognition.stop();
    this.isRecording = false;
  }
}
