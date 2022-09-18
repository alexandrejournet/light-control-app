import {ModEnum} from "../enum/mod.enum";

export class Mod {
  mod?: ModEnum;
  hex?: string;

  constructor(mod: ModEnum, hex: string) {
    this.mod = mod;
    this.hex = hex;
  }
}

export const rainbow = [
  new Mod(ModEnum.RAINBOW_FADE, '0x25'),
  new Mod(ModEnum.RAINBOW_NO_FADE, '0x38'),
];

export const pulse = [
   new Mod(ModEnum.PULSE_RED, '0x26'),
   new Mod(ModEnum.PULSE_GREEN, '0x27'),
   new Mod(ModEnum.PULSE_BLUE, '0x28'),
   new Mod(ModEnum.PULSE_YELLOW, '0x29'),
   new Mod(ModEnum.PULSE_CYAN, '0x2a'),
   new Mod(ModEnum.PULSE_PURPLE, '0x2b'),
   new Mod(ModEnum.PULSE_WHITE, '0x2c'),
   new Mod(ModEnum.PULSE_RED_GREEN, '0x2d'),
   new Mod(ModEnum.PULSE_RED_BLUE, '0x2e'),
   new Mod(ModEnum.PULSE_GREEN_BLUE, '0x2f'),
];

export const strobos = [
   new Mod(ModEnum.STROBOS_RAINBOW, '0x30'),
   new Mod(ModEnum.STROBOS_RED, '0x31'),
   new Mod(ModEnum.STROBOS_GREEN, '0x32'),
   new Mod(ModEnum.STROBOS_BLUE, '0x33'),
   new Mod(ModEnum.STROBOS_YELLOW, '0x34'),
   new Mod(ModEnum.STROBOS_CYAN, '0x35'),
   new Mod(ModEnum.STROBOS_PURPLE, '0x36'),
   new Mod(ModEnum.STROBOS_WHITE, '0x37'),
];
