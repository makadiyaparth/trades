import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[focus]'
})
export class FocusDirective implements OnInit {
  @Input() focus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private hostElement: ElementRef) { }

  ngOnInit(): void {
    this.focus$.subscribe(value => {
      if (value) {
        this.hostElement.nativeElement.focus();
      }
    });
  }
}
