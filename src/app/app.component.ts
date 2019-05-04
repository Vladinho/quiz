import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import 'rxjs/add/operator/filter';

import {StateService} from './services/state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ]
})
export class AppComponent implements OnInit {
  constructor(private stateService: StateService,
              private router: Router) {
  }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((val: any) => {
        if (val.url === '/') {
          this.stateService.showBackground();
          this.stateService.reset();
        } else {
          this.stateService.hideBackground();
        }
      });
  }
}
