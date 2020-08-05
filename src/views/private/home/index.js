import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { DefaultLayout } from '@/components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import calendar from '@/assets/images/calendar.png';
import help from '@/assets/images/Help.png';

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
    minWidth: '481px',
    height: '48px',
    boxShadow: '0px 2px 3px #00000029',
    borderRadius: '2px',
    padding: '13px 16px',
    display: 'flex',
    alignItems: 'center',
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
    marginRight: '10px',
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
}));

export default function HomeView() {
  const classes = useStyles();

  return (
    <DefaultLayout>
      <div className={classes.root}>
        <div className={classes.filterSection}>
          <h1 className={classes.title}>Dashboard</h1>
          <div className={classes.flexGrow} />
          <Card className={classes.filterDate}>
            {
              calendar
                ? <img src={calendar} alt="calendar icon" />
                : ''
            }
            <span className={classes.periodText}>Period</span>
            <span className={classes.dateText}>11 September 2018 - 14 September 2018</span>
            <ExpandMoreIcon style={{ fontSize: '30px', color: '#757575' }} />
          </Card>
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
        <Card className={classes.turnoverWrapper}>
        </Card>
      </div>
    </DefaultLayout>
  );
}
