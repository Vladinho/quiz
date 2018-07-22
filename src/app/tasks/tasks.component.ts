import { Component, OnInit } from '@angular/core';
import {StateService} from '../services/state.service';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks;
  // curentQuestion = 0;
  youAreRight = false;
  youAreWrong = false;
  constructor(
      private stateService: StateService,
      private router: Router
  ) {
    this.tasks = stateService.tasks;
    // stateService.curentQuestion = 0;
  }

  doAnswer (numberOfQuestion: number, numberOfAnswer: number): void {
    this.stateService.answers.push(numberOfAnswer);
    if (this.stateService.tasks[numberOfQuestion].allAnswers[numberOfAnswer] === this.stateService.tasks[numberOfQuestion].correct_answer) {
      this.showYouWereRight();
      this.stateService.correctAnswers.push(numberOfAnswer);
    } else {
      this.showYouWereWrong();
      this.stateService.incorrectAnswers.push(numberOfAnswer);
    }
    this.stateService.incrementCurrentQuestion();
    if (this.stateService.curentQuestion > this.stateService.tasks.length - 1) {
      clearInterval(this.stateService.timer);
      this.router.navigateByUrl('results');
    }
    this.stateService.addTime();
  }

  ngOnInit() {
  }

  onSubmit(event: Event) {
    console.log(event);
  }

  showYouWereRight () {
    this.youAreRight = true;
    setTimeout(() => {
      this.youAreRight = false;
    }, 1000);
  }

  showYouWereWrong () {
    this.youAreWrong = true;
    setTimeout(() => {
      this.youAreWrong = false;
    }, 1000);
  }
}
