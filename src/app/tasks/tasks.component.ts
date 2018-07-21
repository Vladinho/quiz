import { Component, OnInit } from '@angular/core';
import {StateService} from '../services/state.service';
import {FormControl, FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private tasks;
  curentQuestion = 0;
  youAreRight = false;
  youAreWrong = false;
  constructor(private stateService: StateService) {
    this.tasks = stateService.tasks;
    console.log(this.tasks);
  }

  show () {
    console.log(this.tasks);
  }

  doAnswer (numberOfQuestion: number, numberOfAnswer: number): void {
    console.log(numberOfQuestion, numberOfAnswer);
    this.stateService.answers.push(numberOfAnswer);
    if (this.stateService.tasks[numberOfQuestion].allAnswers[numberOfAnswer] == this.stateService.tasks[numberOfQuestion].correct_answer) {
      this.showYouWereRight();
    } else {
      this.showYouWereWrong();
    }
    this.curentQuestion = this.curentQuestion + 1;
    console.log(this.stateService.answers);
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
