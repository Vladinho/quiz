import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-lives',
  templateUrl: './lives.component.html',
  styleUrls: ['./lives.component.scss']
})
export class LivesComponent {
  lives = [];
  constructor(private stateService: StateService) {
    stateService.countOflives = Math.ceil(stateService.tasks.length * 0.3);
    for (let i = 0; i < this.stateService.countOflives; i++) {
      this.lives.push(i);
    }
  }
}
