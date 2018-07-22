import { Component, OnInit } from '@angular/core';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.createTimer();
  }

}
