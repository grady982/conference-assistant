import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/loading.service';
import { OpenaiService } from './core/openai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'Webcomm Conference Assistant';
  isLoading: boolean = false;

  fileName: string = 'please chose file..';
  speechToText: string = '';
  summary: string = '';

  constructor(
    private loading: LoadingService,
    private openai: OpenaiService
  ) {}

  ngOnInit(): void {
    this.loading.isLoading().subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  onFileSelected(event: any) {
    this.loading.open();

    const formData = new FormData();
    formData.append('file', event);
    
    this.fileName = event.target.files[0].name;
    this.speechToText = 'How is the weather today?';

    this.openai.getSpeechToText().subscribe(response => {
      this.loading.close();
      this.speechToText = response.choices[0].text;
    });

    this.openai.getCompletion(this.speechToText).subscribe(response => {
      this.loading.close();
      this.summary = response.choices[0].message.content;
    });

  }

}
