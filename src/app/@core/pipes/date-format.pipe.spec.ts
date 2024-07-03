import { TestBed } from '@angular/core/testing';
import { DateFormatPipe } from './date-format.pipe';
import { DatePipe } from '@angular/common';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe]
    });

    const datePipe = TestBed.inject(DatePipe);
    pipe = new DateFormatPipe(datePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format the date correctly', () => {
    const dateStr = '2023-07-03T19:52:00';
    const formattedDate = pipe.transform(dateStr);
    expect(formattedDate).toBe('July 3, 2023 7:52 PM');
  });

  it('should return "-" for an empty value', () => {
    expect(pipe.transform('')).toBe('-');
  });
});
