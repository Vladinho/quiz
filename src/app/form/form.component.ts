import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {StateService} from '../services/state.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  subscribe: Subscription;
  form: FormGroup;
  categories;
  amount: number;
  level: string;
  type: string;
  url = 'https://opentdb.com/api.php?';
  constructor(
      private http: Http,
      private stateService: StateService,
      private router: Router ) {
      stateService.startLoading();
      console.log('aaa', this.stateService.isLoading);
  }

  ngOnInit() {
    this.subscribe = this.http.get('https://opentdb.com/api_category.php')
        .subscribe((respone: any) => {
      this.categories = respone.json().trivia_categories;
      console.log(this.categories);
      this.stateService.stopLoading();
    });
    this.form = new FormGroup({
      'amount': new FormControl(10, [Validators.max(50), Validators.min(1)]),
      'category': new FormControl('any', []),
      'difficulty': new FormControl('any', []),
      'type': new FormControl('any', []),
    });
  }
  onSubmit() {
    this.stateService.startLoading();
    let str: string = '';
    for (let item in this.form.controls) {
      if (this.form.controls[item].value !== 'any')
        str += `${item}=${this.form.controls[item].value}&`;
    }
    str = str.slice(0, -1);
    this.url += str;
    console.log(this.url);
    this.http.get(this.url)
        .subscribe((respone: any) => {
          let tasksWithallAnswers = [];
          respone.json().results
            .forEach((task: any) => {
              task.question = task.question.replace(/&quot;/g,'"');
              task.question = task.question.replace(/&#039;/g,'"');
              task.allAnswers = JSON.parse(JSON.stringify(task.incorrect_answers));
              task.allAnswers.push(task.correct_answer);
              this.shuffle(task.allAnswers);
              tasksWithallAnswers.push(task);
          });
          this.stateService.tasks = tasksWithallAnswers;
              // console.log(respone.json());
          this.url = 'https://opentdb.com/api.php?';
          this.stateService.stopLoading();
          this.router.navigateByUrl('tasks');
        });
    this.stateService.background = false;
  }

  shuffle(array: [any]) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
