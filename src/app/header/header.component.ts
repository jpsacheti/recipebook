import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output()
  selectedEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onSelection(selected: string) {
    this.selectedEvent.emit(selected);
  }
}
