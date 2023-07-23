import dayjs from 'dayjs';
type GetAvailableMonthsPeriodsListArgs = {
  lastPeriod: string;
};
export const getAvailableMonthsPeriodsList = ({
  lastPeriod,
}: GetAvailableMonthsPeriodsListArgs) => {
  // const now = new Date();
  const now = dayjs();
  // const { defaultMonth, defaultYear } = getDefaultMonth(vnode.attrs.lastMonth);
  // const lastAccountDate = new Date(defaultYear, defaultMonth, 1);
  // const nextAccountDate = addMonths(1, lastAccountDate)
  const lastAccountDate = dayjs(lastPeriod).add(1, 'month').set('date', 1);
  const nextAccountDate = lastAccountDate.add(1, 'month').set('date', 1);
  const [defaultMonth, defaultYear] = lastAccountDate
    .format('MM YYYY')
    .split(' ');
  const list: string[] = [];
  //         if (vnode.attrs.type === "newAccount") {
  //             setSelected({
  //                 text: buildMonthText(nextAccountDate),
  //                 year: defaultYear,
  //                 month: defaultMonth
  //             })
  //             // if => diff between now and nextAccountDate (or dateCreatedContract)
  //             // then => create list of option
  //             let diff = monthDiff(now, nextAccountDate);
  //             // console.log(diff, "if diff < 0 , should add all delta");
  //             if (diff < 0) {
  //                 const list = [];
  //                 let periodMonth = now.getMonth();
  //                 let periodYear = now.getFullYear();
  //                 // const DAYS_IN_MONTH_TO_DECREASE = 15
  //                 // if (now.getDate() < DAYS_IN_MONTH_TO_DECREASE) periodMonth--
  //                 while (diff !== 1) {
  //                     const periodDate = new Date(periodYear, periodMonth, 1);
  //                     list.push({ text: buildMonthText(periodDate), date: periodDate });
  //                     if (periodMonth === -1) { //end of year
  //                         periodYear--;
  //                         periodMonth = 11
  //                     } else {
  //                         periodMonth--
  //                     }
  //                     diff++;
  //                 }
  //                 node.state.list = list
  //             }
  return list;
};
