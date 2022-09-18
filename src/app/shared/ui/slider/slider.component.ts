import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit {

  @Input() name: string = 'Non défini';
  @Input() value: number = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;

  @ViewChild('range') range?: ElementRef;

  // TODO DEBOUNCE EVENT EMIT

  ngAfterViewInit(): void {
    this.fillProgress();
  }

  fillProgress() {
    if (this.range) {
      const pourcent = ((this.value / this.max) * 100).toFixed(2);
      this.range.nativeElement.style.background = `linear-gradient(to right, black 0%, black ${pourcent}%, #c1c1c1 ${pourcent}%, #c1c1c1 100%)`;
    }
  }
}
