import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {

  @Input() index: number | undefined = 0;
  @Input() checked: boolean | undefined = false;
  @Output() switchEvent: EventEmitter<any> = new EventEmitter<any>();

  switch() {
    this.switchEvent.emit();
  }
}
