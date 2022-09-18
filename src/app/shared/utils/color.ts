// Permet de récupérer une couleur
import {Color} from "../../models/color.model";

export const standardColor = new Uint8Array([0x56, 0, 0, 0, 0xff, 0x0f, 0xaa]);

export const colorByte = (color: Color) => {
  return new Uint8Array([0x56, color.r!, color.g!, color.b!, 0x00, 0xf0, 0xaa]);
}

export const colorWithDimmer = (color: Color, dimmer: number) => {
  const actualDimmer = ((255 * dimmer) / 100) & 0xff;
  const calcR = (color.r! * dimmer) / 100;
  const calcG = (color.g! * dimmer) / 100;
  const calcB = (color.b! * dimmer) / 100;

  return new Uint8Array([
    0x56,
    calcR,
    calcG,
    calcB,
    actualDimmer,
    0xf0,
    0xaa,
  ]);
}

export const color = (rgb: Color) => {
  return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
}

export const getRandomRgb = () => {
  const o = Math.round;
  const r = Math.random;
  const s = 255;

  return {
    r: o(r() * s),
    g: o(r() * s),
    b: o(r() * s),
  };
}
