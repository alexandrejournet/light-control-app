import {Component, Input, OnInit} from '@angular/core';
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
export class EffectItemComponent implements OnInit {
  @Input() effect: Mod | undefined;

  constructor(public readonly formatService: FormatService) { }

  ngOnInit(): void {
  }

}
