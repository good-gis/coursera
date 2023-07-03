import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appCourseBorder]',
})
export class CourseBorderDirective implements OnChanges {
  @Input()
  appCourseBorder!: Date;

  creationDate!: Date;

  constructor(private readonly elementRef: ElementRef) {}

  ngOnChanges(): void {
    this.creationDate = this.appCourseBorder;
    const currentDate = new Date();
    const twoWeeksAgo = new Date();

    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    if (this.creationDate < currentDate && this.creationDate >= twoWeeksAgo) {
      this.setBorderColor('var(--tui-positive-hover)');

      return;
    }

    if (this.creationDate > currentDate) {
      this.setBorderColor('var(--tui-primary-hover)');
    }
  }

  private setBorderColor(color: string): void {
    this.elementRef.nativeElement.style.border = `1px solid ${color}`;
  }
}
