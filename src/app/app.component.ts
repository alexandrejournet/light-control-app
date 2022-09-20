import {Component, HostListener, OnInit} from '@angular/core';
import {SwUpdate, VersionEvent} from "@angular/service-worker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'LedController';

  isPortrait = false;

  constructor(private readonly swUpdate: SwUpdate) {
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange() {
    this.checkState();
  }

  checkState() {
    this.isPortrait = window.innerHeight > window.innerWidth;
  }

  ngOnInit(): void {
    this.checkState();
    this.swUpdate.versionUpdates.subscribe((value: VersionEvent) => {
      console.log('Available version: ', value);
      if (value.type === "VERSION_DETECTED") {
        if (confirm('Une nouvelle version est disponible. Votre page va être rechargée.')) {
          this.swUpdate.activateUpdate().then(() => {
            window.location.reload()
          });
        }
      }
    })
  }
}
