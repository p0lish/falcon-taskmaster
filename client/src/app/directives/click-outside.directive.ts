import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private elementRef: ElementRef) {
  }

  @Output()
  public appClickOutside = new EventEmitter<MouseEvent>();
  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {

    if ( !targetElement) {return; }

    const clicked1 = this.elementRef.nativeElement === targetElement.parentElement?.parentElement;
    const clicked2 = this.elementRef.nativeElement === targetElement.parentElement?.parentElement?.parentElement;

    if (!(clicked2 || clicked1)) {
        this.appClickOutside.emit(event);
    }
  }

}
