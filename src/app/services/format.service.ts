import { Injectable } from '@angular/core';
import {ModEnum} from "../models/enum/mod.enum";

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  formatMod(mod: ModEnum) {
    switch (mod) {
      case ModEnum.PULSE_BLUE:
      case ModEnum.STROBOS_BLUE:
        return 'Bleu';
      case ModEnum.PULSE_CYAN:
      case ModEnum.STROBOS_CYAN:
        return 'Cyan';
      case ModEnum.PULSE_GREEN:
      case ModEnum.STROBOS_GREEN:
        return 'Vert';
      case ModEnum.PULSE_PURPLE:
      case ModEnum.STROBOS_PURPLE:
        return 'Violet';
      case ModEnum.PULSE_RED:
      case ModEnum.STROBOS_RED:
        return 'Rouge';
      case ModEnum.PULSE_WHITE:
      case ModEnum.STROBOS_WHITE:
        return 'Blanc';
      case ModEnum.PULSE_YELLOW:
      case ModEnum.STROBOS_YELLOW:
        return 'Jaune';
      case ModEnum.PULSE_GREEN_BLUE:
        return 'Vert/bleu';
      case ModEnum.PULSE_RED_BLUE:
        return 'Rouge/bleu';
      case ModEnum.PULSE_RED_GREEN:
        return 'Rouge/vert';
      case ModEnum.PULSE_RED_GREEN_BLUE:
      case ModEnum.STROBOS_RED_GREEN_BLUE:
        return 'RVB';
      case ModEnum.RAINBOW_FADE:
        return 'Arc-en-ciel (fade-in-out)';
      case ModEnum.RAINBOW_NO_FADE:
        return 'Arc-en-ciel (aucun fade)';
      case ModEnum.STROBOS_RAINBOW:
        return 'Arc-en-ciel';
      case ModEnum.RED_GREEN_BLUE:
        return 'RVB';
    }
  }
}
