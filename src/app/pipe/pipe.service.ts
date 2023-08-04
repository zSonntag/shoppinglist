import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundTo5Rp'
})
export class PipeService implements PipeTransform {
  transform(value: number): string {
    const roundedValue = Math.round(value * 20) / 20;
    return roundedValue.toFixed(2);
  }
}

