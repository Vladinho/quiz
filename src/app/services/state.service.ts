import {Injectable} from '@angular/core';
@Injectable()
export class StateService {
    public isLoading = false;
    public tasks: any;
    public answers = [];
    public correctAnswers = [];
    public background = true;
    public startLoading(): void {
        this.isLoading = true;
    }
    public stopLoading(): void {
        this.isLoading = false;
    }
}
