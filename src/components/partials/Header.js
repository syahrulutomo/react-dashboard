import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, IconButton,
} from '@material-ui/core';
import logo from '@/assets/images/advotics-logo.jpg';
import exit from '@/assets/images/exit.png';
import account from '@/assets/images/profil.png';
import customTheme from '@/assets/theme/colors';


export function Header(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      boxSizing: 'border-box',
      backgroundColor: customTheme.background.default,
      boxShadow: '0px 3px 6px #00000029',
    },
    toolbar: {
      padding: '0px 32px',
    },
    logo: {
      width: '129px',
    },
    secondaryWrapper: {
      boxSizing: 'border-box',
      marginLeft: '6px',
      display: 'flex',
      alignItems: 'baseline',
      marginTop: '15px',
    },
    logoSecondary: {
      width: '72px',
      position: 'absolute',
      top: '20px',
      marginTop: '7px',
      marginLeft: '5px',
    },
    logoSecondaryWrapper: {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'baseline',
    },
    text: {
      textAlign: 'left',
      fontSize: '11px',
      fontFamily: 'Open sans, sans-serif',
      letterSpacing: '0px',
      color: '#5B5B5B',
      opacity: '1',
    },
    flexGrow: {
      flexGrow: 1,
    },
    userWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      marginRight: '5px',
    },
    userName: {
      fontFamily: 'Open sans, sans-serif',
      fontSize: '14px',
      color: '#727272',
      margin: 0,
      marginBottom: '2px',
    },
    companyName: {
      fontFamily: 'Open sans, sans-serif',
      fontSize: '10px',
      color: '#727272',
      margin: 0,
      fontWeight: '300',
    },
    signOutButton: {
      marginLeft: theme.spacing(1),
      padding: '6px',
    },
    accountButton: {
      padding: '6px',
    },
  }));
  
  const { className } = props;

  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <img src={logo} alt="logo" className={classes.logo} />
        </RouterLink>
        <div className={classes.secondaryWrapper}>
          <span className={classes.text}>powered by</span>
          <div className={classes.logoSecondaryWrapper}>
            <img src={logo} alt="logo" className={classes.logoSecondary} />
          </div>
        </div>
        <div className={classes.flexGrow} />
        <div className={classes.userWrapper}>
          <p className={classes.userName}>Username</p>
          <p className={classes.companyName}>Company Name</p>
        </div>
        <IconButton
          className={classes.accountButton}
          color="default"
        >
          <img src={account} alt="account icon" />
        </IconButton>
        <IconButton
          className={classes.signOutButton}
          color="default"
        >
          <img src={exit} alt="exit icon" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};
