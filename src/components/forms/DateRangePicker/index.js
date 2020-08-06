import React, { useState } from "react";
import PropTypes from 'prop-types';
import {
	addMonths,
	isSameDay,
	isWithinRange,
	isAfter,
	isBefore,
	isSameMonth,
	addYears,
	max,
	min
} from "date-fns";
import Menu from "./components/Menu";
import { defaultRanges } from "./defaults";
import { parseOptionalDate } from "@/utilities";
import { connect } from 'react-redux';
import { setStartDate, setEndDate } from '@/services/redux/actions/filter-date';

export const MARKERS = {
	FIRST_MONTH: Symbol("firstMonth"),
	SECOND_MONTH: Symbol("secondMonth")
};

const getValidatedMonths = (range, minDate, maxDate) => {
	let { startDate, endDate } = range;
	if (startDate && endDate) {
		const newStart = max(startDate, minDate);
		const newEnd = min(endDate, maxDate);

		return [newStart, isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd];
	} else {
		return [startDate, endDate];
	}
};

const DateRangePickerImpl = props => {
	const today = new Date();

	const {
		open,
		onChange,
		initialDateRange,
		minDate,
		maxDate,
    definedRanges = defaultRanges,
    style,
    onSetStartDate,
    onSetEndDate,
	} = props;

	const minDateValid = parseOptionalDate(minDate, addYears(today, -10));
	const maxDateValid = parseOptionalDate(maxDate, addYears(today, 10));
	const [intialFirstMonth, initialSecondMonth] = getValidatedMonths(
		initialDateRange || {},
		minDateValid,
		maxDateValid
	);

	const [dateRange, setDateRange] = useState({ ...initialDateRange });
	const [hoverDay, setHoverDay] = useState();
	const [firstMonth, setFirstMonth] = useState(intialFirstMonth || today);
	const [secondMonth, setSecondMonth] = useState(
		initialSecondMonth || addMonths(firstMonth, 1)
	);

	const { startDate, endDate } = dateRange;

	// handlers
	const setFirstMonthValidated = (date) => {
		if (isBefore(date, secondMonth)) {
      setFirstMonth(date);
		}
	};

	const setSecondMonthValidated = (date) => {
		if (isAfter(date, firstMonth)) {
      setSecondMonth(date);
		}
	};

	const setDateRangeValidated = (range) => {
		let { startDate: newStart, endDate: newEnd } = range;
		if (newStart && newEnd) {
      range.startDate = newStart = max(newStart, minDateValid);
      onSetStartDate(startDate);
      range.endDate = newEnd = min(newEnd, maxDateValid);
      onSetEndDate(endDate);
			setDateRange(range);
			onChange(range);
			setFirstMonth(newStart);
			setSecondMonth(isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd);
		}
	};

	const onDayClick = (day) => {
		if (startDate && !endDate && !isBefore(day, startDate)) {
			const newRange = { startDate, endDate: day };
			onChange(newRange);
      setDateRange(newRange);
      onSetStartDate(newRange.startDate);
      onSetEndDate(newRange.endDate);
		} else {
			setDateRange({ startDate: day, endDate: undefined });
      onSetStartDate(startDate);
      onSetEndDate(undefined);
    }
		setHoverDay(day);
	};

	const onMonthNavigate = (marker, action) => {
		if (marker == MARKERS.FIRST_MONTH) {
			const firstNew = addMonths(firstMonth, action);
			if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
		} else {
			const secondNew = addMonths(secondMonth, action);
			if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
		}
	};

	const onDayHover = (date) => {
		if (startDate && !endDate) {
			if (!hoverDay || !isSameDay(date, hoverDay)) {
				setHoverDay(date);
			}
		}
	};

	// helpers
	const inHoverRange = (day) => {
		return (startDate &&
			!endDate &&
			hoverDay &&
			isAfter(hoverDay, startDate) &&
			isWithinRange(day, startDate, hoverDay));
	};

	const helpers = {
		inHoverRange
	};

	const handlers = {
		onDayClick,
		onDayHover,
		onMonthNavigate
	};

	return open ? (
		<Menu
			dateRange={dateRange}
			minDate={minDateValid}
			maxDate={maxDateValid}
			ranges={definedRanges}
			firstMonth={firstMonth}
			secondMonth={secondMonth}
			setFirstMonth={setFirstMonthValidated}
			setSecondMonth={setSecondMonthValidated}
			setDateRange={setDateRangeValidated}
			helpers={helpers}
      handlers={handlers}
      style={style}
		/>
	) : null;
};

DateRangePickerImpl.propTypes = {
	open: PropTypes.bool.isRequired,
	initialDateRange: PropTypes.array,
	definedRanges: PropTypes.array,
	minDate: PropTypes.string,
	maxDate: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  onSetStartDate: PropTypes.func,
  onSetEndDate: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    startDate: state.filterDate.startDate,
    endDate: state.filterDate.endDate,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetStartDate: (date) => dispatch(setStartDate(date)),
    onSetEndDate: (date) => dispatch(setEndDate(date)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DateRangePickerImpl);
