import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Accordion from '@material-ui/core/Accordion';
import IconButton from '@material-ui/core/IconButton';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { DefaultLayout, DateRangePicker } from '@/components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import calendar from '@/assets/images/calendar.png';
import help from '@/assets/images/Help.png';
import { connect } from 'react-redux';
import {format} from 'date-fns';

const useStyles = makeStyles(() => ({
  root: {},
  title: {
    textAlign: 'left',
    fontWeight: 600,
    fontFamily: 'Source Sans Pro',
    fontSize: '40px',
    letterSpacing: '0px',
    color: '#707070C4',
    margin: '0',
  },
  filterSection: {
    display: 'flex',
    marginBottom: '32px',
  },
  flexGrow: {
    flexGrow: 1,
  },
  filterDate: {
    boxSizing: 'border-box',
    width: '742px',
    height: '48px',
    boxShadow: '0px 2px 3px #00000029',
    borderRadius: '2px',
    padding: '13px 16px',
    display: 'flex',
    alignItems: 'center',
    borderBottomLeftRadius: '0 !important',
    borderBottomRightRadius: '0 !important',
    margin: '0 !important',

    '&:before': {
      backgroundColor: 'transparent',
    }
  },
  filterDateContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  periodText: {
    fontSize: '16px',
    fontFamily: 'Open sans, sans-serif',
    color: '#8B8B8B',
    fontWeight: '400',
    marginLeft: '16px',
    marginRight: '24px',
  },
  dateText: {
    fontSize: '16px',
    fontFamily: 'Open sans, sans-serif',
    color: '#6A6A6A',
    fontWeight: '400',

    '&:hover': {
      cursor: "pointer",
   },
  },
  cardInsight: {
    boxSizing: 'border-box',
    backgroundColor: '#37B04C',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '2px',
  },
  insightTitle: {
    color: '#FFF',
    fontWeight: 600,
    fontSize: '20px',
    fontFamily: 'Source Sans Pro, sans-serif',
  },
  helpWrapper: {
    boxSizing: 'border-box',
    display: 'flex',
    minWidth: '160px',
    alignItems: 'center',
  },
  lampIcon: {
    width: '20px',
    marginRight: '4px',
  },
  helpText: {
    color: '#FFF',
    fontSize: '14px',
    fontFamily: 'Source Sans Pro',
    fontWeight: 400,
    textDecoration: 'underline',
    textDecorationColor: '#F7F7F7',
    margin: '0',
    textDecorationThickness: '0px',
    opacity: '.8',
    marginRight: '10px',
  },
  closeButton: {
    position: 'absolute',
    right: '0px'
  }
}));

function HomeView(props) {
  const { startDate, endDate } = props;
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(true);
  const [dateRange, setDateRange] = useState({});

  return (
    <DefaultLayout>
      <div className={classes.root}>
        <div className={classes.filterSection}>
          <h1 className={classes.title}>Dashboard</h1>
          <div className={classes.flexGrow} />
            <Accordion className={classes.filterDate}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ width: '100%' }}
              >
                <div className={classes.filterDateContainer}>
                  {
                    calendar
                      ? <img src={calendar} alt="calendar icon" />
                      : ''
                  }
                  <span className={classes.periodText}>Period</span>
                  <span className={classes.dateText}> <span style={{ marginRight: '8px' }}>{ dateRange.startDate ? format(dateRange.startDate, 'DD MMMM YYYY'): '' }</span> - <span style={{ marginLeft: '8px' }}>{ dateRange.endDate ? format(dateRange.endDate, 'DD MMMM YYYY') : '' }</span> </span>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <DateRangePicker open={isOpen} onChange={(range) => setDateRange(range)} style={{
                  position: 'absolute', right: '-1px', top: '48px', boxShadow: '0px 2px 3px #00000029', borderTopLeft: '0px', borderTopRight: '0px' }}/>
              </AccordionDetails>
            </Accordion>
        </div>
        <Card className={classes.cardInsight}>
          <span className={classes.insightTitle}>MARKET INSIGHTS</span>
          <div className={classes.flexGrow} />
          <div className={classes.helpWrapper}>
            <img className={classes.lampIcon} src={help} alt="lamp icon" />
            <p className={classes.helpText}>Click Here For Help</p>
            <ExpandLessIcon style={{ fontSize: '30px', color: '#FFF' }} />
          </div>
        </Card>
      </div>
    </DefaultLayout>
  );
}

HomeView.propTypes = {
  startDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  endDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
}

const mapStateToProps = (state) => {
  return {
    startDate: state.filterDate.startDate,
    endDate: state.filterDate.endDate,
  }
}

export default connect(mapStateToProps)(HomeView);
