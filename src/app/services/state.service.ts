import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
@Injectable()
export class StateService {
    public isLoading = false;
    public tasks: any;
    public answers = [];
    public correctAnswers = [];
    public incorrectAnswers = [];
    public countOflives: number;
    public background = true;
    constructor (private router: Router) {}
    public startLoading(): void {
        this.isLoading = true;
    }
    public stopLoading(): void {
        this.isLoading = false;
    }

    public tryAgain() {
        this.correctAnswers = [];
        this.incorrectAnswers = [];
        this.answers = [];
        this.background = true;
        this.router.navigateByUrl('/');
    }
}
