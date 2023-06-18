import isSameOrBeforeDayJs from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfterDayJs from 'dayjs/plugin/isSameOrAfter';
import dayjs from 'dayjs';
dayjs.extend(isSameOrAfterDayJs);
dayjs.extend(isSameOrBeforeDayJs);

export type DateType = dayjs.ConfigType;

export const isSameOrBefore = (originDate: DateType, anotherDate: DateType) =>
  dayjs(originDate).isSameOrBefore(anotherDate);
export const isSameOrAfter = (originDate: DateType, anotherDate: DateType) =>
  dayjs(originDate).isSameOrAfter(anotherDate);
export const isBetween = (
  originDate: DateType,
  startDate: DateType,
  endDate: DateType,
) =>
  isSameOrAfter(originDate, startDate) && isSameOrBefore(originDate, endDate);

export const formatDate = (d: DateType) => dayjs(d).format('DD/MM/YYYY');
