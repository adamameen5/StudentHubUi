import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[fallbackImage]' // applies only to <img> elements with this attribute
})
export class FallbackImageDirective {
  @Input() fallbackImage: string = '/assets/images/no-image-placeholder.png';

  private hasTriedFallback = false;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  onError(): void {
    const img = this.el.nativeElement;

    // Prevent infinite loop in case fallback also fails
    if (!this.hasTriedFallback) {
      this.hasTriedFallback = true;
      img.src = this.fallbackImage;
    }
  }
}
