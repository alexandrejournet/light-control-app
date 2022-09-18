import { Color } from './color.model';
import { RealLight } from './real-light.model';
import {ModEnum} from "./enum/mod.enum";

export abstract class Constant {
  static STANDARD_COLOR = new Uint8Array([0x56, 0, 0, 0, 0xff, 0x0f, 0xaa]);
  static POWER_ON_DATA = new Uint8Array([0xcc, 0x23, 0x33]);
  static POWER_OFF_DATA = new Uint8Array([0xcc, 0x24, 0x33]);
  static DEFAULT_COLOR: Color = { r: 255, g: 0, b: 0 };
  static REAL_LIGHT_HEXA: RealLight[] = [
    {
      name: 'CANDLE',
      color: { r: 255, g: 147, b: 41 },
    },
    {
      name: 'LOW_TUNGSTEN',
      color: { r: 255, g: 197, b: 143 },
    },
    {
      name: 'HIGH_TUNGSTEN',
      color: { r: 255, g: 214, b: 170 },
    },
    {
      name: 'HALOGEN',
      color: { r: 255, g: 241, b: 224 },
    },
    {
      name: 'CARBON_ARC',
      color: { r: 255, g: 250, b: 244 },
    },
    {
      name: 'HIGH_NOON_SUN',
      color: { r: 255, g: 255, b: 251 },
    },
    {
      name: 'DIRECT_SUNLIGHT',
      color: { r: 255, g: 255, b: 255 },
    },
  ];

  static mods = new Map<ModEnum, string>([
    [ModEnum.RAINBOW_FADE, '0x25'],
    [ModEnum.RAINBOW_NO_FADE, '0x38'],
    [ModEnum.PULSE_RED, '0x26'],
    [ModEnum.PULSE_GREEN, '0x27'],
    [ModEnum.PULSE_BLUE, '0x28'],
    [ModEnum.PULSE_YELLOW, '0x29'],
    [ModEnum.PULSE_CYAN, '0x2a'],
    [ModEnum.PULSE_PURPLE, '0x2b'],
    [ModEnum.PULSE_WHITE, '0x2c'],
    [ModEnum.PULSE_RED_GREEN, '0x2d'],
    [ModEnum.PULSE_RED_BLUE, '0x2e'],
    [ModEnum.PULSE_GREEN_BLUE, '0x2f'],
    [ModEnum.PULSE_RED_GREEN_BLUE, '0x61'],
    [ModEnum.STROBOS_RAINBOW, '0x30'],
    [ModEnum.STROBOS_RED, '0x31'],
    [ModEnum.STROBOS_GREEN, '0x32'],
    [ModEnum.STROBOS_BLUE, '0x33'],
    [ModEnum.STROBOS_YELLOW, '0x34'],
    [ModEnum.STROBOS_CYAN, '0x35'],
    [ModEnum.STROBOS_PURPLE, '0x36'],
    [ModEnum.STROBOS_WHITE, '0x37'],
    [ModEnum.STROBOS_RED_GREEN_BLUE, '0x62'],
    [ModEnum.RED_GREEN_BLUE, '0x63'],
  ]);

  static options = {
    filters: [
      {
        namePrefix: 'QHM',
      },
      {
        namePrefix: 'Triones',
      },
      {
        namePrefix: 'BRGlight',
      },
      {
        namePrefix: 'Color',
      },
      {
        namePrefix: 'Dream',
      },
      {
        namePrefix: 'Light',
      },
      {
        namePrefix: 'Flash',
      },
      {
        namePrefix: 'LD',
      },
    ],
    optionalServices: [
      '0000ffd5-0000-1000-8000-00805f9b34fb',
      '0000ffd0-0000-1000-8000-00805f9b34fb',
    ],
  }
}
