import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import set = Reflect.set;
@Injectable()
export class StateService {
    public isLoading = false;
    public tasks: any;
    public answers = [];
    public correctAnswers = [];
    public incorrectAnswers = [];
    public countOflives: number;
    public background = true;
    public curentQuestion = 0;
    public time = 10;
    public timer: any;
    constructor (private router: Router) {}
    public startLoading(): void {
        this.isLoading = true;
    }
    public stopLoading(): void {
        this.isLoading = false;
    }
    public addTime(): void {
        this.time = 10;
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
        clearInterval(this.timer);
        this.correctAnswers = [];
        this.incorrectAnswers = [];
        this.answers = [];
        this.background = true;
        this.curentQuestion = 0;
        this.router.navigateByUrl('/');
    }
}
