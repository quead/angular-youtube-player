import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNum',
})
export class ShortNumPipe implements PipeTransform {
  transform(number: string): any {
    const getNumber = parseInt(number, 10);
    if (isNaN(getNumber)) {
      return null;
    }
    if (getNumber === null) {
      return null;
    }
    if (getNumber === 0) {
      return null;
    }
    let abs = Math.abs(getNumber);
    const rounder = Math.pow(10, 1);
    const isNegative = getNumber < 0;
    let key = '';

    const powers = [
      { key: 'Q', value: Math.pow(10, 15) },
      { key: 'T', value: Math.pow(10, 12) },
      { key: 'B', value: Math.pow(10, 9) },
      { key: 'M', value: Math.pow(10, 6) },
      { key: 'K', value: 1000 },
    ];

    for (let i = 0; i < powers.length; i++) {
      let reduced = abs / powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = powers[i].key;
        break;
      }
    }
    return (isNegative ? '-' : '') + abs + key;
  }
}
