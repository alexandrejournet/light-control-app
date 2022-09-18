import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'LedController';

  isPortrait = false;

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange() {
    this.checkState();
  }

  checkState() {
    this.isPortrait = window.innerHeight > window.innerWidth;
    console.log(this.isPortrait)
  }

  ngOnInit(): void {
    this.checkState();
  }


}
