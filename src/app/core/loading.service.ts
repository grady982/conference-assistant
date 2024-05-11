import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  isLoading() {
    return this.isLoading$.asObservable();
  }

  open() {
    this.isLoading$.next(true);
  }

  close() {
    this.isLoading$.next(false);
  }
}
