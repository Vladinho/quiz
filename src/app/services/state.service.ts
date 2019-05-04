import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import set = Reflect.set;
@Injectable()
export class StateService {
    public isLoading = false;
    public tasks = [];
    public answers = [];
    public correctAnswers = [];
    public incorrectAnswers = [];
    public countOflives: number;
    public background = true;
    public curentQuestion = 0;
    public countOfTime = 20;
    public timer: any;
    public statusCode = 200;
    public statusText = '';
    public emptyTasks = false;
    public time = this.countOfTime;
    constructor (private router: Router) {}
    public startLoading(): void {
        this.isLoading = true;
    }
    public stopLoading(): void {
        this.isLoading = false;
    }
    public addTime(): void {
        this.time = this.countOfTime;
    }

    public createTimer() {
        this.timer = setInterval(() => {
            this.time--;
            if (this.time === 0) {
                this.incorrectAnswers.push('not answered');
                this.addTime();
                this.incrementCurrentQuestion();
                  }
        }, 1000);
    }
    public incrementCurrentQuestion(){
        this.curentQuestion++;
        if (this.countOflives  === this.incorrectAnswers.length) {
            clearInterval(this.timer);
        }
    }
    public tryAgain() {
        this.reset();
        this.router.navigateByUrl('/');
    }

  public reset() {
    clearInterval(this.timer);
    this.correctAnswers = [];
    this.incorrectAnswers = [];
    this.answers = [];
    this.background = true;
    this.curentQuestion = 0;
    this.statusCode = 200;
    this.emptyTasks = false;
    this.statusText = '';
  }
}
