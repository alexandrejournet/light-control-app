import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Destroyed} from "../../shared/injectable/destroyed.injectable";
import {interval, Observable, of, takeUntil} from "rxjs";
import {WeatherService} from "../../services/weather.service";
import {WeatherData} from "../../models/weather.data";
import {SharedModule} from "../../shared/shared.module";
import {ColorPickerComponent} from "../../shared/ui/color-picker/color-picker.component";
import {BluetoothService} from "../../services/custom-bluetooth.service";
import {Constant} from "../../models/constant.model";
import {Device} from "../../models/device.model";
import {LocalStorageService} from "../../services/local-storage.service";
import {isNotNullOrUndefined} from "../../shared/utils/utils.static";
import {FormsModule} from "@angular/forms";
import {LampeComponent} from "../../shared/ui/lampe/lampe.component";
import {CardComponent} from "../../shared/ui/card/card.component";
import {SliderComponent} from "../../shared/ui/slider/slider.component";
import {EffectCategoryComponent} from "../../shared/ui/effect-category/effect-category.component";
import {EffectEnum} from "../../models/enum/effect.enum";
import {Color} from "../../models/color.model";
import {colorWithDimmer, coolWhite, coolWithDimmer, modByte, warmWhite, warmWithDimmer} from "../../shared/utils/color";
import packageJson from '../../../../package.json'
import {Mod} from "../../models/constants/mods.constant";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SharedModule, ColorPickerComponent, FormsModule, LampeComponent, CardComponent, SliderComponent, EffectCategoryComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends Destroyed implements OnInit {

  readonly fetchInterval = interval(1000);
  readonly fetchIntervalWeather = interval(3600000);
  currentTime: Observable<Date> = of(new Date());

  currentWeatherData: WeatherData | undefined;

  devices: Device[] = [];
  allOn = false;

  dimmer: number = 100;
  speed: number = 10;

  currentLight: 'warm' | 'cool' | 'color' = "warm";

  readonly effects = EffectEnum;
  effectCategorySelected: EffectEnum | undefined;
  selectedDevice: Device | undefined = undefined;
  selectedColor: Color | undefined;
  public version: string = packageJson.version;

  constructor(private readonly weatherService: WeatherService,
              private readonly bluetoothService: BluetoothService,
              private readonly localStorage: LocalStorageService) {
    super();
  }

  keepOrder = (a: any, b: any) => {
    return a;
  }

  ngOnInit(): void {
    //this.initDevices();

    this.fetchWeather();

    this.fetchInterval
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.currentTime = of(new Date());
      });

    this.fetchIntervalWeather
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.fetchWeather();
      });
  }

  fetchWeather() {
    this.weatherService.getWeatherData()
      .pipe(takeUntil(this.destroyed))
      .subscribe((value) => {
        this.currentWeatherData = value;
      });
  }

  async pressButton() {

    console.group("Sync device");
    const device = await this.bluetoothService.discover(Constant.options);

    console.log('[BLE::Info] Device info %o', device);

    const gatt = await this.bluetoothService.connectDevice(device);
    console.log('[BLE::Info] GATT info %o', gatt);

    const primaryService = await this.bluetoothService.getPrimaryService(gatt!, '0000ffd5-0000-1000-8000-00805f9b34fb') as BluetoothRemoteGATTService;
    console.log('[BLE::Info] Primary Service info %o', primaryService);

    const characteristic = await this.bluetoothService.getCharacteristic(primaryService, '0000ffd9-0000-1000-8000-00805f9b34fb') as BluetoothRemoteGATTCharacteristic;
    console.log('[BLE::Info] Characteristic info %o', characteristic);
    console.groupEnd();


    const deviceToAdd = new Device(device, gatt, primaryService, characteristic, true, true);
    if (!this.devices.some(item => item.device?.name === deviceToAdd.device?.name)) {
      this.devices.push(deviceToAdd);
      this.saveAllToLocalStorage();
    }

    console.log(deviceToAdd.stringifyAll());

    this.bluetoothService.writeValue$(characteristic, Constant.POWER_ON_DATA);
    this.allOn = true;
  };

  lightOn() {
    this.devices.forEach(item => {
      item.isOn = true;
      this.bluetoothService.writeValue$(item.characteristic!, Constant.POWER_ON_DATA);
    })
  }

  lightOff() {
    this.devices.forEach(item => {
      item.isOn = false;
      this.bluetoothService.writeValue$(item.characteristic!, Constant.POWER_OFF_DATA);
    })
  }

  lightAll() {
    if (this.allOn) {
      this.lightOff()
    } else {
      this.lightOn();
    }
    this.allOn = !this.allOn;
    console.debug("[Info] Light all : ", this.allOn)
  }

  initDevices() {
    if (isNotNullOrUndefined(this.localStorage.getData('devices'))) {
      this.devices = JSON.parse(this.localStorage.getData('devices')!);
    }
  }

  saveAllToLocalStorage() {
    this.localStorage.saveData('devices', JSON.stringify(this.devices.map(item => item.stringifyAll())))
  }

  checkLights() {
    this.allOn = !this.devices.some(item => !item.isOn);
  }

  selectOpened(event: EffectEnum) {
    if (this.effectCategorySelected === event) {
      this.effectCategorySelected = undefined;
    } else {
      this.effectCategorySelected = event;
    }
  }

  checkSelectedCategory(effect: EffectEnum) {
    return isNotNullOrUndefined(this.effectCategorySelected) && effect === this.effectCategorySelected;
  }

  selectColor(color: Color) {
    this.currentLight = 'color';
    this.selectedColor = color;
    const colorToSend = colorWithDimmer(color, this.dimmer);
    this.sendColorToDevices(colorToSend);
  }

  sendColorToDevices(bytes: Uint8Array) {
    if (this.selectedDevice) {

    } else {
      this.allOn = true;
      this.devices.forEach(item => {
        item.isOn = true;
        this.bluetoothService.writeValue$(item.characteristic!, bytes);
      })
    }
  }

  warmWhiteLight() {
    this.currentLight = 'warm';
    this.allOn = true;
    this.devices.forEach(item => {
      item.isOn = true;
      this.bluetoothService.writeValue$(item.characteristic!, warmWhite);
    })
  }

  coolWhiteLight() {
    this.currentLight = 'cool';
    this.allOn = true;
    this.devices.forEach(item => {
      item.isOn = true;
      this.bluetoothService.writeValue$(item.characteristic!, coolWhite);
    })
  }

  dimmerLight(value: number) {
    this.dimmer = value;
    let color;
    switch (this.currentLight) {
      case "warm":
        color = warmWithDimmer(this.dimmer);
        break;
      case "cool":
        color = coolWithDimmer(this.dimmer);
        break;
      case "color":
        if (this.selectedColor) {
          color = colorWithDimmer(this.selectedColor, this.dimmer);
        } else {
          color = warmWithDimmer(this.dimmer);
        }
        break;
    }
    this.sendColorToDevices(color);
  }

  sendMod(mod: Mod) {
    const bytes = modByte(mod, this.speed);
    this.sendColorToDevices(bytes);
  }
}
