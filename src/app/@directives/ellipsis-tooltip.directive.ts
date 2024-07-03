import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEllipsisTooltip]'
})
export class EllipsisTooltipDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    const text = this.el.nativeElement.textContent;
    this.renderer.setAttribute(this.el.nativeElement, 'title', text);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeAttribute(this.el.nativeElement, 'title');
  }
}
