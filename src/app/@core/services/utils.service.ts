import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getCssVariable(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
  }
}
