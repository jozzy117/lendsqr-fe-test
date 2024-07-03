import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: string): string {
    if (!value) return '-';

    const processedValue = value.replace(' -', '-');
    const formattedDate = this.datePipe.transform(processedValue, 'MMMM d, y h:mm a');

    return formattedDate ?? '';
  }

}
