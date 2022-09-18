import {EventEmitter, Injectable} from '@angular/core';
import {WebBluetooth} from "../shared/injectable/web-ble.injectable";
import {from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  private gatt$: EventEmitter<BluetoothRemoteGATTServer>;
  private characteristicValueChanges$: EventEmitter<DataView>;
  private gattServer: BluetoothRemoteGATTServer | undefined;

  constructor(private readonly webBle: WebBluetooth) {
    this.gatt$ = new EventEmitter<BluetoothRemoteGATTServer>();
    this.characteristicValueChanges$ = new EventEmitter<DataView>();
  }

  /**
   * Run the discovery process.
   *
   * @return  The GATT server for the chosen device
   * @param options
   */
  async discover(options: RequestDeviceOptions = {} as RequestDeviceOptions): Promise<BluetoothDevice> {
    options.optionalServices = options.optionalServices || ['generic_access'];

    console.log('[BLE::Info] Requesting devices with options %o', options);

    let device = null;
    try {
      device = await this.webBle.requestDevice(options);
      device.addEventListener('gattserverdisconnected', this.onDeviceDisconnected.bind(this));

      if (!device) {
        console.error(`[BLE::Error] Can not get the Bluetooth Remote GATT Server. Abort.`);
        await Promise.reject();
      }

    } catch (error) {
      console.error(error);
    }

    return device!;
  }

  onDeviceDisconnected(event: Event) {
    const disconnectedDevice = event.target as BluetoothDevice;
    console.log('[BLE::Info] disconnected device %o', disconnectedDevice);
  }

  /**
   * Connect to current device.
   *
   * @return  Emites the gatt server instance of the requested device
   */
  async connectDevice(device: BluetoothDevice): Promise<any> {
    if (device) {
      console.log('[BLE::Info] Connecting to Bluetooth Remote GATT Server of %o', device);

      try {
        const gattServer = await device.gatt?.connect();
        this.gattServer = gattServer;
        return gattServer;
      } catch (error) {
        await Promise.reject();
      }
    } else {
      console.error('[BLE::Error] Was not able to connect to Bluetooth Remote GATT Server');
    }

    await Promise.reject();
  }

  /**
   * Requests the primary service.
   *
   * @param gatt The BluetoothRemoteGATTServer sever
   * @param service The UUID of the primary service
   * @return The remote service (as a Promise)
   */
  async getPrimaryService(gatt: BluetoothRemoteGATTServer, service: BluetoothServiceUUID): Promise<BluetoothRemoteGATTService> {
    try {
      const remoteService = await gatt.getPrimaryService(service);
      return await Promise.resolve(remoteService);
    }
    catch (error) {
      return await Promise.reject();
    }
  }

  /**
   * Requests a characteristic from the primary service.
   *
   * @param primaryService The primary service.
   * @param characteristic The characteristic's UUID.
   * @returns The characteristic description (as a Promise).
   */
  async getCharacteristic(
    primaryService: BluetoothRemoteGATTService,
    characteristic: BluetoothCharacteristicUUID
  ): Promise<BluetoothRemoteGATTCharacteristic | void> {
    console.log('[BLE::Info] Getting Characteristic "%s" of %o', characteristic, primaryService);

    try {
      return await primaryService.getCharacteristic(characteristic);
    }
    catch (rejectionError) {
      Promise.reject();
    }
  }

  /**
   * Writes a value into the specified characteristic.
   *
   * @param characteristic The requested characteristic.
   * @param value The value to be written (as an ArrayBuffer or Uint8Array).
   * @return an void Observable.
   */
  writeValue$(characteristic: BluetoothRemoteGATTCharacteristic, value: ArrayBuffer | Uint8Array) {
    console.log('[BLE::Info] Writing Characteristic %o', characteristic);

    return from(characteristic.writeValue(value).then(_ => Promise.resolve(), (error: DOMException) => Promise.reject(`${error.message}`)));
  }

}
