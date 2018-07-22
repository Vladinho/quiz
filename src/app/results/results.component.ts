import { Component, OnInit } from '@angular/core';
import {StateService} from '../services/state.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  percentages: number;
  constructor(
      private stateService: StateService,
      private router: Router
  ) {
    this.percentages = Math.floor(stateService.correctAnswers.length * 100 / stateService.answers.length);
  }
}
