import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class Destroyed implements OnDestroy {
  protected readonly destroyed: Subject<void>;

  constructor() {
    this.destroyed = new Subject<void>();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
