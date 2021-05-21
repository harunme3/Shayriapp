import { Directive ,HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appDual]'
})
export class DualDirective {

  @Output() doubleTap =new EventEmitter();


  constructor() { }
  @HostListener('tap',  ['$event'])

  OnTap(e) {
    if (e.tapCount === 2) {
      this.doubleTap.emit(e)
    }

  }

}
