import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectNamePipe } from './pipe/effect-name.pipe';

//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const PIPES: any[] = [];

const DIRECTIVES: any[] = [];

@NgModule({
  declarations: [...PIPES, ...DIRECTIVES, EffectNamePipe, ],
  imports: [CommonModule],
    exports: [
        ...PIPES,
        ...DIRECTIVES,
        EffectNamePipe,
    ],
})
export class SharedModule {}
