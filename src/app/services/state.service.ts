import {Injectable} from '@angular/core';
@Injectable()
export class StateService {
    public isLoading = false;
    public startLoading(): void {
        this.isLoading = true;
    }
    public stopLoading(): void {
        this.isLoading = false;
    }
}
