import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { List, ListItem, ListItemText, Button, Typography } from '@material-ui/core';
import { isSameDay } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';

const isSameRange = (first, second) => {
  const { startDate: fStart, endDate: fEnd } = first;
  const { startDate: sStart, endDate: sEnd } = second;
  if (fStart && sStart && fEnd && sEnd) {
    return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd);
  }
  return false;
};

const DefinedRanges = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      boxSizing: 'border-box',
      width: '160px',
    },
    listItem: {
      paddingLeft: '16px',
      paddingRight: '16px',
      background: '#FFF',
      position: 'relative',
    },
    selected: {
      backgroundColor: '#289E45',
  
      '&:hover': {
        backgroundColor: '#37B04C',
      }
    },
    text: {
      color: '#8B8B8B'
    },
    textSelected: {
      color: '#FFF !important',
    },
    divider: {
      width: '80%',
      position: 'absolute',
      bottom: '0px',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderBottom: '1px solid #D2D2D2',
    },
    button: {
      width: '100%',
      backgroundColor: '#37B04C',
      color: '#FFF',
      marginTop: '16px',
      padding: '8px 0',
  
      '&:hover': {
        backgroundColor: '#279D44',
      }
    }
  }));
  
  const {
    setRange,
    selectedRange,
    ranges,
  } = props;

  const [tempRange, setTempRange] = useState([]);

  const classes = useStyles();

  return (
    <List className={classes.root}>
      {ranges.map((range, index) => (
        <ListItem className={clsx({
            [classes.listItem]: true,
            [classes.selected]: range === tempRange,
          })}
          button key={index} onClick={() => setTempRange(range)}
        >
          <ListItemText
            className= {clsx({
              [classes.text]: range !== tempRange,
              [classes.textSelected]: range === tempRange
            })}
            primaryTypographyProps={{ variant: 'body2', style: { fontWeight: isSameRange(range, selectedRange) ? 'bold' : '500' } }}
          >
            {range.label}
          </ListItemText>
          {
            range !== selectedRange ?
            <div className={classes.divider}/>
            : ''
          }
        </ListItem>
      ))}
      <ListItem>
        <Button className={classes.button} onClick={() => setRange(tempRange)}>
          <span style={{color: '#FFF', fontWeight: 'bold'}}>Apply</span>
        </Button>
      </ListItem>
    </List>
  );
};

DefinedRanges.propTypes = {
  setRange: PropTypes.func,
  selectedRange: PropTypes.object,
  ranges: PropTypes.array,
};

export default DefinedRanges;
