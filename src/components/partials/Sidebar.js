import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { BurgerButton as Burger } from '@/components';
import chart from '@/assets/images/Dashboard icon.svg';
import { connect } from 'react-redux';
import { openSidebar, closeSidebar } from '@/services/redux/actions/sidebar';

const drawerWidth = 72;

const useStyles = makeStyles((theme) => ({
  root: {
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    border: '0.5px solid #D2D2D2',
    zIndex: 99,
  },
  burgerButton: {
    backgroundColor: 'transparent !important',
    padding: '24px 0 0 24px',
  },
  drawerPaper: {
    width: drawerWidth,
    height: 'calc(100% - 64px)',
    marginTop: '64px',
    border: '0.5px solid #D2D2D2',
    borderTop: 'none',
    zIndex: 99,
  },
  drawerHeader: {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3, 3, 0, 3),
    marginBottom: '-10px',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center',
    padding: '14px 24px',
  },
  listItemIcon: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function Sidebar(props) {
  const { open, onOpenSidebar, onCloseSidebar } = props;
  const classes = useStyles();
  const menuList = [
    {
      name: 'dashboard',
      icon: (<img
        src={chart}
        alt="dashboard"
        style={{
          width: '17px', height: '17px', borderRadius: '3px', marginLeft: '-3px',
        }}
      />),
    },
  ];

  const handleDrawerOpen = () => {
    onOpenSidebar();
  };

  const handleDrawerClose = () => {
    onCloseSidebar();
  };

  return (
    <>
      {
        open === false
          ? (
            <IconButton
              className={classes.burgerButton}
              style={{
                position: 'fixed', top: '60px', left: '-15px', zIndex: '99', transition: 'left .5s ease',
              }}
              onClick={handleDrawerOpen}
            >
              <Burger />
            </IconButton>

          )
          : (

            <IconButton
              className={classes.burgerButton}
              onClick={handleDrawerOpen}
              style={{
                position: 'fixed', top: '75px', zIndex: '99', left: '-100px',
              }}
            >
              <Burger />
            </IconButton>

          )
      }

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List className={classes.list} style={{ paddingTop: '3px' }}>
          <ListItem className={classes.listItem} button key="0" style={{ padding: '24px 0 0 0' }} onClick={handleDrawerClose}>
            <Burger />
          </ListItem>
        </List>

        <List className={classes.list}>
          {menuList.map((m) => (
            <ListItem className={classes.listItem} button key={m.name}>
              <ListItemIcon className={classes.listItemIcon}>{m.icon}</ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenSidebar: PropTypes.func.isRequired,
  onCloseSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    open: state.sidebar.open,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseSidebar: () => dispatch(closeSidebar()),
    onOpenSidebar: () => dispatch(openSidebar()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
