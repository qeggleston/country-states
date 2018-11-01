import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() buttonEvent = new EventEmitter<{name: string, code: string}>();
  constructor() { }

  ngOnInit() {
  }

  getNewSubmission(name: string, code: string) {
    this.buttonEvent.emit({name: name, code: code})
  }

}
