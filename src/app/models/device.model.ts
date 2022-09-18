export class Device {
  name?: string;
  device?: BluetoothDevice;
  server?: BluetoothRemoteGATTServer;
  service?: BluetoothRemoteGATTService;
  characteristic?: BluetoothRemoteGATTCharacteristic;
  isOn?: boolean;
  isConnected?: boolean;


  constructor(device: any, server: BluetoothRemoteGATTServer, service: BluetoothRemoteGATTService, characteristic: BluetoothRemoteGATTCharacteristic, isOn: boolean, isConnected: boolean) {
    this.device = device;
    this.server = server;
    this.service = service;
    this.characteristic = characteristic;
    this.isOn = isOn;
    this.isConnected = isConnected;
    this.name = device?.name;
  }

  stringifyAll() {
    const deviceString: { device: string; server: string; service: string; characteristic: string; isOn: boolean; } = {
      device: JSON.stringify(this.device),
      server: JSON.stringify(this.server),
      service: JSON.stringify(this.service),
      characteristic: JSON.stringify(this.characteristic),
      isOn: !!this.isOn
    };

    return JSON.stringify(deviceString);
  }
}
