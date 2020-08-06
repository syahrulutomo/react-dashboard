import {
  addDays,
	startOfWeek,
	endOfWeek,
	addWeeks,
	startOfMonth,
	endOfMonth,
	addMonths
} from "date-fns";

const getDefaultRanges = (date) => [
	{
		label: "Today",
		startDate: date,
		endDate: date
	},
	{
		label: "Yesterday",
		startDate: addDays(date, -1),
		endDate: date
	},
	{
		label: "Last 7 days",
		startDate: addDays(date, -7),
		endDate: addDays(date, -1)
  },
  {
		label: "Last 30 days",
		startDate: addDays(date, -30),
		endDate: endOfMonth(date, -1)
	},
	{
		label: "This Month",
		startDate: startOfMonth(date),
		endDate: endOfMonth(date)
  },
  {
		label: "Custom",
		startDate: undefined,
		endDate: undefined
  },
];

export const defaultRanges = getDefaultRanges(new Date());
