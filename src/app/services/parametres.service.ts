import { Injectable } from '@angular/core';
import {Constant} from "../models/constant.model";
import {Device} from "../models/device.model";
import {Color} from "../models/color.model";

@Injectable({
  providedIn: 'root'
})
export class ParametresService {

  devices = [];

  color: string = this.getColor(Constant.DEFAULT_COLOR);
  rgbColor = Constant.DEFAULT_COLOR;
  isOk = false;
  isAutoConnect = false;
  //appModel= APP_MODE.DEFAULT;
  isEffectSet = false;
  actualMod: string = '';
  selectedMod;
  pulseExtended = false;
  strobosExtended = false;
  rainbowExtended = false;
  selectedColor = { r: 255, g: 255, b: 255 };
  dimmer: number = 100;
  speed: number = 10;
  isConnected = false;

  isOn: boolean;

  selectedDevice: Device;

  getColor(rgb: Color) {
    return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
  }
}
