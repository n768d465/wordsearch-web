import { Injectable, ElementRef } from '@angular/core';
import { BorderColors } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class WordsearchLogicService {
  constructor() { }

  setBorderColors(coords: number[][], refs: ElementRef[], borderColor: BorderColors) {
    if (coords?.length && refs?.length) {
      const ref = refs.find(item => item.nativeElement.id === `(${coords[0]},${coords[1]})`);
      this.setBorderColor(ref, borderColor);
    }
  }

  setBorderByElementRef(refs: any[], borderColor: BorderColors) {
    refs.forEach(ref => this.setBorderColor(ref, borderColor));
  }

  setBorderColor(ref: ElementRef, borderColor: BorderColors) {
    ref.nativeElement.style['background-color'] = borderColor;
  }
}
