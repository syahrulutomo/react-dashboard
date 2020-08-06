import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  leftBorderRadius: {
    borderRadius: '50% 0 0 50%',
  },
  rightBorderRadius: {
    borderRadius: '0 50% 50% 0',
  },
  buttonContainer: {
    display: 'flex',
  },
  button: {
    height: 36,
    width: 36,
    padding: 0,
  },
  buttonText: {
    lineHeight: 1.6,
  },
  outlined: {
    border: `1px solid #289E45`,
  },
  filled: {
    '&:hover': {
      backgroundColor: '#37B04C',
      color: '#8B8B8B',
    },
    backgroundColor: '#289E45',
  },
  highlighted: {
    backgroundColor: '#EAF0F4',
  },
  contrast: {
    color: theme.palette.primary.contrastText,
  },
}));

const Day = (props) => {
  const {
    filled,
    outlined,
    highlighted,
    disabled,
    startOfRange,
    endOfRange,
    onClick,
    onHover,
    value,
  } = props;
  const classes = useStyles();

  return (
    <div className={clsx({
      [classes.buttonContainer]: true,
      [classes.leftBorderRadius]: startOfRange,
      [classes.rightBorderRadius]: endOfRange,
      [classes.highlighted]: !disabled && highlighted,
    })}

    >
      <IconButton
        className={clsx({
          [classes.button]: true,
          [classes.outlined]: !disabled && outlined,
          [classes.filled]: !disabled && filled,
        })}
        disabled={disabled}
        onClick={onClick}
        onMouseOver={onHover}
      >
        <Typography
          color={!disabled ? 'initial' : 'textSecondary'}
          className={clsx({
            [classes.buttonText]: true,
            [classes.contrast]: !disabled && filled
          })}
          variant="body2"
        >
          {value}
        </Typography>
      </IconButton>
    </div>
  );
};

Day.propTypes = {
  startOfRange: PropTypes.bool,
  filled: PropTypes.bool,
  outlined: PropTypes.bool,
  highlighted: PropTypes.bool,
  disabled: PropTypes.bool,
  endOfRange: PropTypes.bool,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Day;
