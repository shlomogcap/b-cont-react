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

export const dateTimeDiffFormat = (
  datetime: IDateType,
  options?: {
    useHours?: boolean;
    fallback?: string;
    diffParam?: 'datesOnly' | 'weeks';
  },
) => {
  const {
    useHours = false,
    fallback = '---',
    diffParam = 'datesOnly',
  } = options ?? {};

  const dateObj = dayjs(datetime);
  const year = dateObj.get('year');
  const month = dateObj.get('month') + 1;
  const date = dateObj.get('date');

  if (isNaN(year) || isNaN(month) || isNaN(date) || dateObj.isValid()) {
    return fallback;
  }
  let d = String(date);
  let m = String(month);
  let y = String(year);

  if (month < 10) {
    m = '0' + m;
  }
  if (date < 10) {
    d = '0' + d;
  }

  const dist = dayjs().diff(date, 'days');
  const absDist = Math.abs(dist);
  let output = '';
  if (absDist < 7) {
    if (absDist === 0) output = 'היום';
    else {
      switch (dist) {
        case 1:
          output = 'מחר';
          break;
        case 2:
          output = '+יומיים';
          break;
        case -1:
          output = 'אתמול';
          break;
        case -2:
          output = 'שלשום';
          break;
        default:
          if (dist < 0) {
            output = `לפני ${absDist} ימים`;
          } else {
            output = `${dist} ימים`;
          }
      }
    }
  } else {
    if (diffParam === 'datesOnly') {
      output += d + '/' + m + '/' + y.toString().substring(2);
    } else if (diffParam === 'weeks') {
      const weeks = Math.floor(absDist / 7);
      const days = absDist % 7;
      if (dist < 0) {
        output += 'לפני ';
      }
      output += `${weeks}ש`;
      if (days > 0) {
        output += ` (+${days})`;
      }
    } else {
      if (dist < 0) {
        output += 'לפני ';
      } else {
        output += 'עוד ';
      }
      output += `${absDist} יום`;
    }
  }

  if (useHours) {
    const hours = dateObj.get('hour');
    const minutes = dateObj.get('minutes');
    let h = String(hours);
    let mm = String(minutes);
    if (minutes < 10) {
      mm = '0' + mm;
    }
    output += ` ${h}:${mm}`;
  }
  return output;
};
