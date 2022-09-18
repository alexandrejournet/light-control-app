import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class WebBluetooth {
  private readonly ble;

  constructor() {
    this.ble = navigator.bluetooth;
    if (!this.ble) {
      console.error('Your browser does not support Smart Bluetooth. See http://caniuse.com/#search=Bluetooth for more details.');
    }
  }

  requestDevice(options: RequestDeviceOptions): Promise<BluetoothDevice> {
    return this.ble.requestDevice(options);
  }
}
