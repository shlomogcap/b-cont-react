import isSameOrBeforeDayJs from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfterDayJs from 'dayjs/plugin/isSameOrAfter';
import dayjs from 'dayjs';
dayjs.extend(isSameOrAfterDayJs);
dayjs.extend(isSameOrBeforeDayJs);

export type IDateType = dayjs.ConfigType;

export const isSameOrBefore = (originDate: IDateType, anotherDate: IDateType) =>
  dayjs(originDate).isSameOrBefore(anotherDate);
export const isSameOrAfter = (originDate: IDateType, anotherDate: IDateType) =>
  dayjs(originDate).isSameOrAfter(anotherDate);
export const isBetween = (
  originDate: IDateType,
  startDate: IDateType,
  endDate: IDateType,
) =>
  isSameOrAfter(originDate, startDate) && isSameOrBefore(originDate, endDate);

export const formatDate = (d: IDateType) => dayjs(d).format('DD/MM/YYYY');
