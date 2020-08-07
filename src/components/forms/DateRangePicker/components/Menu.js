import React from 'react';
import {
  Paper,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
// import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { format, differenceInCalendarMonths } from 'date-fns';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import Month from './Month';
import DefinedRanges from './DefinedRanges';

export const MARKERS = {
  FIRST_MONTH: Symbol('firstMonth'),
  SECOND_MONTH: Symbol('secondMonth'),
};



const Menu = (props) => {
  const useStyles = makeStyles((theme) => ({
    header: {
      boxSizing: 'border-box',
      padding: '20px 70px',
    },
    headerItem: {
      flex: 1,
      textAlign: 'center',
    },
    divider: {
      borderLeft: `1px solid #D7DAE2`,
      marginBottom: 20,
    },
    dividerBold: {
      borderLeft: `2px solid #D7DAE2`,
      marginBottom: 20,
    },
    monthContainer: {
      paddingTop: '16px',
    }
  }));
  
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
    style,
  } = props;
  const classes = useStyles();
  const { startDate, endDate } = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange, minDate, maxDate, helpers, handlers,
  };
  return (
    <Paper elevation={5} square style={style}>
      <Grid container direction="row" wrap="nowrap">
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
          />
        </Grid>
        <div className={classes.dividerBold} />
        <Grid>
          <Grid className={classes.monthContainer} container direction="row" justify="center" wrap="nowrap">
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[false, canNavigateCloser]}
              disableNextButton={true}
              marker={MARKERS.FIRST_MONTH}
            />
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              disablePrevButton={true}
              marker={MARKERS.SECOND_MONTH}
            />
          </Grid>
        </Grid>
        <div className={classes.divider} />
      </Grid>
    </Paper>
  );
};

Menu.propTypes = {
  dateRange: PropTypes.object,
  ranges: PropTypes.array,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  firstMonth: PropTypes.instanceOf(Date),
  secondMonth: PropTypes.instanceOf(Date),
  setFirstMonth: PropTypes.func,
  setSecondMonth: PropTypes.func,
  setDateRange: PropTypes.func,
  helpers: PropTypes.object,
  handlers: PropTypes.object,
  style: PropTypes.object,
};

export default Menu;
