import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  IconButton,
  Select,
  MenuItem,
} from '@material-ui/core';
import {format} from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import {
  setMonth, getMonth, setYear, getYear,
} from 'date-fns';
import { classes } from 'istanbul-lib-coverage';
// import { useStyles } from '@material-ui/pickers/views/Calendar/Day';


const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const generateYears = (relativeTo, count) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const Header = (props) => {
  const useStyles = makeStyles({
    iconContainer: {
      padding: 5,
    },
    icon: {
      padding: 10,
      '&:hover': {
        background: 'none',
      },
    },
    month: {
      fontWeight: '700',
      fontFamily: 'Open Sans, sans-serif',
      color: '#000000DE',
    }
  });
  
  const {
    date,
    // classes,
    setDate,
    nextDisabled,
    prevDisabled,
    onClickNext,
    onClickPrevious,
    disablePrevButton,
    disableNextButton,
  } = props;

  const customClasses = useStyles();

  const handleMonthChange = (event) => {
    setDate(setMonth(date, parseInt(event.target.value)));
  };

  const handleYearChange = (event) => {
    setDate(setYear(date, parseInt(event.target.value)));
  };

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item className={customClasses.iconContainer}>
        {
          !disablePrevButton ?
            (
              <IconButton
                className={customClasses.icon}
                disabled={prevDisabled}
                onClick={onClickPrevious}
              >
                <ChevronLeft color={prevDisabled ? 'disabled' : 'action'} />
              </IconButton>
            ) :
            (
              <IconButton className={customClasses.icon}>
              </IconButton>
            )
        }
      </Grid>
      <Grid item>
        <div>
          <span className={customClasses.month}>{format(date, "MMMM YYYY")}</span>
        </div>
      </Grid>
      <Grid item>
      </Grid>
      <Grid item className={customClasses.iconContainer}>
        {
          !disableNextButton ?
          (
            <IconButton className={customClasses.icon} disabled={nextDisabled} onClick={onClickNext}>
              <ChevronRight color={nextDisabled ? 'disabled' : 'action'} />
            </IconButton>
          ) :
          (
            <IconButton className={customClasses.icon}>
            </IconButton>
          )
        }
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func,
  nextDisabled: PropTypes.bool,
  prevDisabled: PropTypes.bool,
  onClickNext: PropTypes.func,
  onClickPrevious: PropTypes.func,
  disablePrevButton: PropTypes.bool,
  disableNextButton: PropTypes.bool,
};

export default Header;
