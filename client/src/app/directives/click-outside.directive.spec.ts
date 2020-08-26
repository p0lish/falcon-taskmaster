import { ClickOutsideDirective } from './click-outside.directive';
import { ElementRef } from '@angular/core';

describe('ClickOutsideDirective', () => {
  it('should create an instance', () => {
    const nativeElement = document.createElement('div');
    const element = new ElementRef(nativeElement);
    const directive = new ClickOutsideDirective(element);
    expect(directive).toBeTruthy();
  });
});
