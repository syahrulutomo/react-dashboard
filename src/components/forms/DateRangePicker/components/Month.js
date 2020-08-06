import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import {
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';
import {
  getDate, isSameMonth, isToday, format, isWithinRange,
} from 'date-fns';
import {
  chunks,
  getDaysInMonth,
  isStartOfRange,
  isEndOfRange,
  inDateRange,
  isRangeSameDay,
} from '@/utilities/date';
import Header from './Header';
import Day from './Day';

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const useStyles = makeStyles(() => ({
  root: {
    width: '290px',
  },
  weekDaysContainer: {
    marginTop: '10px',
    marginLeft: '20px',
    marginRight: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid #EAF0F4',
  },
  daysContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 20,
  },
}));

const Month = (props) => {
  const {
    value,
    marker,
    dateRange,
    minDate,
    maxDate,
    navState,
    setValue,
    helpers,
    handlers,
    disablePrevButton,
    disableNextButton,
  } = props;

  const classes = useStyles();
  const [back, forward] = navState;

  return (
    <Paper square elevation={0} className={classes.root}>
      <Grid container>
        <Header
          date={value}
          setDate={setValue}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() => handlers.onMonthNavigate(marker, back)}
          onClickNext={() => handlers.onMonthNavigate(marker, forward)}
          disablePrevButton={disablePrevButton}
          disableNextButton={disableNextButton}
        />

        <Grid
          item
          container
          direction="row"
          justify="space-between"
          className={classes.weekDaysContainer}
        >
          {WEEK_DAYS.map((day) => (
            <Typography color="textSecondary" key={day} variant="caption">
              {day}
            </Typography>
          ))}
        </Grid>

        <Grid
          item
          container
          direction="column"
          justify="space-between"
          className={classes.daysContainer}
        >
          {chunks(getDaysInMonth(value), 7).map((week, index) => (
            <Grid key={index} container direction="row" justify="center" style={{  }}>
              {week.map((day) => {
                const isStart = isStartOfRange(dateRange, day);
                const isEnd = isEndOfRange(dateRange, day);
                const isRangeOneDay = isRangeSameDay(dateRange);
                const highlighted = inDateRange(dateRange, day) || helpers.inHoverRange(day);

                return (
                  <Day
                    key={format(day, 'MM-DD-YYYY')}
                    filled={isStart || isEnd}
                    outlined={isToday(day)}
                    highlighted={highlighted && !isRangeOneDay}
                    disabled={
                      !isSameMonth(value, day)
                      || !isWithinRange(day, minDate, maxDate)
                    }
                    startOfRange={isStart && !isRangeOneDay}
                    endOfRange={isEnd && !isRangeOneDay}
                    onClick={() => handlers.onDayClick(day)}
                    onHover={() => handlers.onDayHover(day)}
                    value={getDate(day)}
                  />
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

Month.propTypes = {
  value: PropTypes.instanceOf(Date),
  marker: PropTypes.symbol,
  dateRange: PropTypes.object,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  navState: PropTypes.array,
  setValue: PropTypes.func,
  helpers: PropTypes.object,
  handlers: PropTypes.object,
  disablePrevButton: PropTypes.bool,
  disableNextButton: PropTypes.bool,
};

export default Month;
