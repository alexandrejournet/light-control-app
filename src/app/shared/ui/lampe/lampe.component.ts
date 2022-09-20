import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Device} from "../../../models/device.model";
import {FormsModule} from "@angular/forms";
import {Constant} from "../../../models/constant.model";
import {BluetoothService} from "../../../services/custom-bluetooth.service";
import {SwitchComponent} from "../switch/switch.component";

@Component({
  selector: 'app-lampe',
  standalone: true,
  imports: [CommonModule, FormsModule, SwitchComponent],
  templateUrl: './lampe.component.html',
  styleUrls: ['./lampe.component.scss']
})
export class LampeComponent implements OnInit {

  @Input() device: Device | undefined;
  @Input() index: any;
  @Output() lightEvent: EventEmitter<any> = new EventEmitter<any>();
  isEditing: boolean = false;

  constructor(private readonly bluetoothService: BluetoothService) { }

  ngOnInit(): void {
  }

  light() {
    if(this.device?.isOn) {
      this.lightOff();
    } else {
      this.lightOn();
    }

    this.device!.isOn = !this.device?.isOn;
    this.lightEvent?.emit();
  }

  lightOn() {
    this.bluetoothService.writeValue$(this.device!.characteristic!, Constant.POWER_ON_DATA);
  }

  lightOff() {
    this.bluetoothService.writeValue$(this.device!.characteristic!, Constant.POWER_OFF_DATA);
  }
}
