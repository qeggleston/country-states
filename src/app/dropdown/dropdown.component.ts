import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent<T> implements OnInit {
  @Input() choices: T[];
  @Output() selectEvent = new EventEmitter<T>();
  constructor() { 
  }
  
  getNewSelection(t: T) {
    console.log(`hey something new got selected ${t}`);
    this.selectEvent.emit(t);
  }

  ngOnInit() {
  }

}
