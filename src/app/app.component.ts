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

  fileName: string = 'choose a file...';
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

  async onFileSelected(event: any) {
    this.loading.open();

    this.fileName = event.target.files[0].name;

    // --
    const file = event.target.files[0];
    console.log('file', file);
    this.openai.transcribeAudio(file).subscribe(response => {
      this.loading.close();
      // this.speechToText = response.choices[0].text;
    }, (error) => {
      this.loading.close();
      console.warn('error', error);
    });

  }

  convertFileAsBlob() {

  }

}
