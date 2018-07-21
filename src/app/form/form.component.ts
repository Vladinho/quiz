import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {StateService} from '../services/state.service';

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
      private stateService: StateService) {
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
    console.log(this.form);
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
          console.log(respone.json());
          this.url = 'https://opentdb.com/api.php?';
          this.stateService.stopLoading();
        });
  }
}
