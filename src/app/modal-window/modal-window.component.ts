import { Component, OnInit } from '@angular/core';
import {StateService} from "../services/state.service";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {

  constructor(private stateService: StateService) { }

  ngOnInit() {
  }

}
