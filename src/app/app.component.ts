import {Component, OnInit} from '@angular/core';
import {StateService} from './services/state.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
      './app.component.scss'
  ]
})
export class AppComponent implements OnInit{
  isLoading;
  constructor(
    private stateService: StateService,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.router.events
      // .filter( event => event instanceof NavigationEnd)
      .subscribe((val: any) => {
      if (val.url === '/') {
        this.stateService.reset();
      }
    });
  }
}
