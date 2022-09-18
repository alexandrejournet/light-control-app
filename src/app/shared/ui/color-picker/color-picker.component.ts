import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Color} from "../../../models/color.model";

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements AfterViewInit {

  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | undefined;

  private mousedown: boolean = false;
  private selectedHeight: number | undefined;
  private selectedWidth: number | undefined;

  @Output() color: EventEmitter<Color> = new EventEmitter();

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.mousedown = false;
  }

  onMouseDown(evt: MouseEvent) {
    this.mousedown = true;
    this.selectedWidth = evt.offsetX;
    this.selectedHeight = evt.offsetY;
    this.draw();
    this.emitColor(evt.offsetX, evt.offsetY);
  }

  onMouseMove(evt: MouseEvent) {
    if (this.mousedown) {
      this.selectedWidth = evt.offsetX;
      this.selectedHeight = evt.offsetY;
      this.draw();
      this.emitColor(evt.offsetX, evt.offsetY);
    }
  }

  ngAfterViewInit() {
    this.draw();
  }

  draw() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d')!;
    }
    const width = this.canvas?.nativeElement.width;
    const height = this.canvas?.nativeElement.height;
    this.ctx!.clearRect(0, 0, width, height);

    const gradient = this.ctx!.createConicGradient(0, 75 , 75);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
    gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

    this.ctx!.beginPath();
    this.ctx!.ellipse(75, 75, 75, 75, 0, 0, 2 * Math.PI);
    this.ctx!.fillStyle = gradient;
    this.ctx!.fill();
    this.ctx!.closePath();

    if (this.selectedHeight && this.selectedWidth) {
      this.ctx.beginPath()
      this.ctx.strokeStyle = 'white';
      this.ctx.lineWidth = 1;
      //this.ctx.rect(this.selectedWidth-5, this.selectedHeight - 5, 10, 10)
      this.ctx.ellipse(this.selectedWidth, this.selectedHeight, 5, 5, 0, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.closePath()
    }
  }



  emitColor(x: number, y: number) {
    const rgbaColor = this.getColor(x, y);
    this.color.emit(rgbaColor);
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx!.getImageData(x, y, 1, 1).data;
    return 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  }

  getColor(x: number, y: number) {
    const imageData = this.ctx!.getImageData(x, y, 1, 1).data;
    const color: Color = new Color();
    color.r = imageData[0];
    color.g = imageData[1];
    color.b = imageData[2];
    return color;
  }
}
