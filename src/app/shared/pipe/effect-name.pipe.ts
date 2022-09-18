import { Pipe, PipeTransform } from '@angular/core';
import {EffectEnum} from "../../models/enum/effect.enum";

@Pipe({
  name: 'effectName'
})
export class EffectNamePipe implements PipeTransform {

  transform(effect: any, ...args: unknown[]): string {
    const current = Number(effect);
    switch (current) {
      case EffectEnum.RAINBOW:
        return 'Arc-en-ciel'
      case EffectEnum.PULSE:
        return 'Pulsation'
      case EffectEnum.STROBOS:
        return 'Stroboscope'
      default:
        return '';
    }
  }
}
