import { Component } from '@angular/core';
import {StateService} from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
      './app.component.scss'
  ]
})
export class AppComponent {
  isLoading;
  constructor(private stateService: StateService) {
    // this.isLoading = stateService.isLoading;
  }
}
