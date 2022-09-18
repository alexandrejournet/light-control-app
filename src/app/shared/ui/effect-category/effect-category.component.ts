import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectEnum} from "../../../models/enum/effect.enum";
import {SharedModule} from "../../shared.module";
import {Mod, pulse, rainbow, strobos} from "../../../models/constants/mods.constant";
import {EffectItemComponent} from "./effect-item/effect-item.component";
import {Event} from "@angular/router";

@Component({
  selector: 'app-effect-category',
  standalone: true,
  imports: [CommonModule, SharedModule, EffectItemComponent],
  templateUrl: './effect-category.component.html',
  styleUrls: ['./effect-category.component.scss']
})
export class EffectCategoryComponent implements OnInit {

  @Input() enum!: string | EffectEnum;
  @Input() isOpened: boolean = false;
  @Output() toggleEvent: EventEmitter<any> = new EventEmitter<any>();

  effectsList: Mod[] = [];

  ngOnInit(): void {
    this.initEffectListing();
  }

  fold() {
    this.toggleEvent.emit(this.enum);
  }

  initEffectListing() {
    switch(this.enum) {
      case EffectEnum.RAINBOW:
        this.effectsList = rainbow;
        break;
      case EffectEnum.PULSE:
        this.effectsList = pulse;
        break;
      case EffectEnum.STROBOS:
        this.effectsList = strobos;
        break;
    }
  }
}
