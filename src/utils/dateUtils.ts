import { format, parseISO } from 'date-fns';

export const DATE_FORMATS = {
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSSSSXXX",
  SIMPLE_DATE_BACKEND: 'yyyy-MM-dd',
  US_SHORT: 'MM/dd/yyyy',
  EU_SHORT: 'dd/MM/yyyy',
  TEXT_EN: 'MMM d, yyyy',
  TEXT_EN_LONG: 'MMMM d, yyyy',
  TEXT_ES: 'd MMM yyyy',
  TEXT_ES_LONG: "d 'de' MMMM 'de' yyyy",
  TIME_24H: 'HH:mm',
  TIME_12H: 'h:mm a',
};

export const parseBackendDate = (dateString: string): Date | null => {
  if (!dateString) return null;
  return parseISO(dateString);
};

export const formatDate = (
  date: Date,
  formatType: keyof typeof DATE_FORMATS
): string => {
  return format(date, DATE_FORMATS[formatType]);
};
