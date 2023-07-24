import dayjs from 'dayjs';

type GetAvailableMonthsPeriodsListArgs = {
  lastPeriod?: string;
};
const DAYS_OVER_TO_ADD_ACCOOUNT = 20;
export const getAvailableMonthsPeriodsList = ({
  lastPeriod,
}: GetAvailableMonthsPeriodsListArgs = {}) => {
  const now = dayjs();
  const lastAccountDate = dayjs(lastPeriod || undefined);
  const nextAccountDate = lastAccountDate.add(1, 'months').set('date', 1);
  const list: string[] = [];
  let diff = now.diff(nextAccountDate, 'months');
  list.push(nextAccountDate.format('MM YYYY'));
  for (let i = 1; i <= diff; i++) {
    if (i === diff && now.date() < DAYS_OVER_TO_ADD_ACCOOUNT) {
      break;
    }
    list.push(nextAccountDate.add(i, 'months').format('MM YYYY'));
  }
  return list;
};
