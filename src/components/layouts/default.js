import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Header, Sidebar } from '@/components/partials';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 56,
    height: '100%',
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    boxSizing: 'border-box',
    position: 'absolute',
    marginLeft: '0',
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingTop: '32px',
    width: '100%',
    height: 'calc(100% - 96px)',
    backgroundColor: '#F7F7F7',
    zIndex: '-1',
    transition: 'margin-left .5s ease',
  },
  show: {
    marginLeft: '72px !important',
    width: 'calc(100% - 72px)',
    transition: 'margin-left .5s ease',
  },
}));

function DefaultLayout(props) {
  const { children, open } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Sidebar />
      <main className={clsx({
        [classes.content]: true,
        [classes.show]: open,
      })}
      >
        {children}
      </main>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    open: state.sidebar.open,
  };
};

export default connect(mapStateToProps)(DefaultLayout);
