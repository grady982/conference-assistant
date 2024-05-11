import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/loading.service';

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

  constructor(
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.loading.isLoading().subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  onFileSelected(event: any) {
    this.loading.open();
    setTimeout(() => {
      this.fileName = event.target.files[0].name;
      this.speechToText = 'This is a sample text from the speech to text conversion';
      this.loading.close();
    }, 2000);

  }

}
