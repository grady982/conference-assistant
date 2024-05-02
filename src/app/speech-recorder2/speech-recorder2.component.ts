import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-speech-recorder2',
  templateUrl: './speech-recorder2.component.html',
  styleUrls: ['./speech-recorder2.component.scss']
})
export class SpeechRecorder2Component {
  isRecording: boolean = false;
  audioChunks: Blob[] = [];
  mediaRecorder?: MediaRecorder;
  recordedAudio?: Blob;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = event => {
          this.audioChunks.push(event.data);
        };
        this.mediaRecorder.onstop = () => {
          console.log('onstop~~~');
          this.recordedAudio = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.audioChunks = [];
          this.changeDetectorRef.detectChanges();
        };
        this.mediaRecorder.start();
        this.isRecording = true;
      })
      .catch(err => {
        console.error('Error accessing microphone: ', err);
      });
  }

  stopRecording() {
    this.mediaRecorder?.stop();
    this.isRecording = false;
  }

  saveRecording() {
    if (!this.recordedAudio) return;
    const url = URL.createObjectURL(this.recordedAudio);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = 'recorded_audio.wav';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
