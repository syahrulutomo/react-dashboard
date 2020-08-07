import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Accordion from '@material-ui/core/Accordion';
import Grid from '@material-ui/core/Grid';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { DefaultLayout, DateRangePicker, StackedBar, ProductList } from '@/components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import calendar from '@/assets/images/calendar.png';
import help from '@/assets/images/Help.png';
import { connect } from 'react-redux';
import {format} from 'date-fns';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

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
  turnover: {
    width: '276px',
    boxShadow: '0px 2px 6px #0000000A',
    marginTop: '16px',
    padding: '16px',
  },
  turnoverHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartContainer: {
    boxSizing: 'border-box',
    marginTop: '16px',
    marginRight: '16px',
    padding: '24px',
    maxHeight: '600px',
    background: '#FFFFFF',
    border: '0.5px solid #C5C5C59C',
    borderRadius: '4px',
  },
  chartHeader: {
    display: 'flex',
    flexWrap: 'no-wrap',
    alignItems: 'center',
    marginBottom: '29px'
  },
  formControl: {
    padding: 0,
    fontSize: '20px',
    fontFamily: 'Source Sans Pro'
  },
  select: {
    background: '#FFFFFF',
    border: '1px solid #D7DAE2 !important',
    padding: '10px 34px 10px 12px',
    borderRadius: '0px',
  },
}));

function HomeView(props) {
  const { startDate, endDate } = props;
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(true);
  const [dateRange, setDateRange] = useState({});
  const [chartPeriod, setChartPeriod] = useState('Last 6 month');

  const handleChangeChartPeriod = (e) => {
    setChartPeriod(e.target.value);
  }

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
                  <Typography className={classes.periodText}>Period</Typography>
                  <span className={classes.dateText}> <span style={{ marginRight: '8px' }}>{ dateRange.startDate ? format(dateRange.startDate, 'DD MMMM YYYY'): '' }</span> - <span style={{ marginLeft: '8px' }}>{ dateRange.endDate ? format(dateRange.endDate, 'DD MMMM YYYY') : '' }</span> </span>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <DateRangePicker open={isOpen} onChange={(range) => setDateRange(range)} style={{
                  position: 'absolute', right: '-1px', top: '48px', boxShadow: '0px 2px 3px #00000029', borderTopLeft: '0px', borderTopRight: '0px', zIndex: '99' }}/>
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
        <Grid container direction='row' justify="flex-start" wrap="nowrap">
          <Card className={classes.turnover} variant="outlined">
            <Grid className={classes.turnoverHeading}>
              <Typography variant='body2' style={{ color: '#8B8B8B' }}>Sales Turnover</Typography>
              <MoreVertIcon style={{ color: '#6A6A6A', fontSize: '22px' }} />
            </Grid>
            <Grid>
              <div>
                <Typography variant='h5' style={{ color: '#000000DE' }}>Rp 3,600,000</Typography>
                <Grid container alignItems='center'>
                  <KeyboardBackspaceIcon color='error' style={{ fontSize: '14px', fontWeight: 'bold', transform: 'rotate(-90deg)', marginBottom: '4px' }}/>
                  <Typography variant='caption' color='error' style={{ marginRight: '4px', fontWeight: 'bold' }}>13.8%</Typography>
                  <Typography variant='caption' style={{ color: '#8B8B8B' }}>last period in products sold</Typography>
                </Grid>
              </div>
            </Grid>
          </Card>
        </Grid>
        <Grid container direction='row' justify="flex-start" wrap="nowrap">
          <Grid>
            <div className={classes.chartContainer}>
              <div className={classes.chartHeader}>
                <Typography variant='h6' color='initial'>AVERAGE PURCHASE VALUE</Typography>
                <div className={classes.flexGrow} />
                <div style={{boxShadow: '0px 2px 3px #0000000 !important'}}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                      className={classes.select}
                      labelId="chart-select-label"
                      id="chart-select"
                      value={chartPeriod}
                      IconComponent={ExpandMoreIcon}
                      onChange={handleChangeChartPeriod}
                    >
                      <MenuItem value='Today'>Today</MenuItem>
                      <MenuItem value='Yesterday'>Yesterday</MenuItem>
                      <MenuItem value='Last 7 days'>Last 7 days</MenuItem>
                      <MenuItem value='Last 30 days'>Last 30 days</MenuItem>
                      <MenuItem value='This month'>This month</MenuItem>
                      <MenuItem value='Last 6 month'>Last 6 months</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <MoreVertIcon style={{ color: '#6A6A6A', fontSize: '20px' }} />
              </div>
              <StackedBar />
            </div>
          </Grid>
          <Grid>
            <ProductList />
          </Grid>
          <Grid>
            <ProductList />
          </Grid>
        </Grid>
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
