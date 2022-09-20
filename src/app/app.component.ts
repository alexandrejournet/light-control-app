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
    this.swUpdate.available.subscribe((event) => {
      console.log('current version: ', event.current);
      console.log('available version: ', event.available);
      if (confirm('Software update avaialble.')) {
        this.swUpdate.activateUpdate().then(() => {
          //Perform your action here
          window.location.reload()
        });
      }
    });

    this.swUpdate.versionUpdates.subscribe((value: VersionEvent) => {
      console.log('Available version: ', value);
      if (confirm('Une nouvelle version est disponible. Votre page va être rechargée.')) {
        this.swUpdate.activateUpdate().then(() => {
          //Perform your action here
          window.location.reload()
        });
      }
    })
  }
}
