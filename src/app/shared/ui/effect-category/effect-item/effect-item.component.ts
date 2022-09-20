import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Mod} from "../../../../models/constants/mods.constant";
import {FormatService} from "../../../../services/format.service";

@Component({
  selector: 'app-effect-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './effect-item.component.html',
  styleUrls: ['./effect-item.component.scss']
})
export class EffectItemComponent {
  @Input() effect: Mod | undefined;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  constructor(public readonly formatService: FormatService) { }

  selectMod() {
    this.select.emit(this.effect);
  }
}
