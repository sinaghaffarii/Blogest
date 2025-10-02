import { format } from 'date-fns-jalali';

export const toPersianDate = (dateInput: string | Date): string => {
  const toPersianDigits = (str: string): string =>
    str.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const formatted = format(date, 'd MMMM yyyy');

  return toPersianDigits(formatted);
};
