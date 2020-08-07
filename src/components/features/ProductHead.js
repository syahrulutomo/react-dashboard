import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  productContainer: {
    border: '0.5px solid #FFE7BD',
    borderRadius: '4px',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '8px',
    background: '#FFE7BD',
  },
  imageContainer: {
    width: '80px',
    height: '80px',
  },
  image: {
    width: '100%',
    height: '100%'
  },
  contentContainer: {
    boxSizing: 'border-box',
    width: 'calc(100% - 96px)',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 9px',
  },
  name: {
    width: '100%',
    fontWeight: 'normal',
    fontSize: '25px',
    fontFamily: 'Source Sans Pro, sans-serif',
    color: '#000000DE',
    margin: 0,
    paddingTop: '12px',
  },
  description: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: '4px',
    paddingBottom: '12px'
  },
  price: {
    margin: 0,
    fontWeight: 400,
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: '20px',
    letterSpacing: '0.25px',
    color: '#00000099'
  },
  sold: {
    margin: 0,
    fontWeight: 400,
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: '20px',
    letterSpacing: '0.25px',
    color: '#00000099',
    marginRight: '24px'
  }
}));

export function ProductHead(props) {
  const { img, price, sold, name } = props;

  const classes = useStyles();

  return (
    <div className={classes.productContainer}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={img} alt={name}/>
      </div>
      <div className={classes.contentContainer}>
        <p className={classes.name}>{name}</p>
        <div className={classes.description}>
          <p className={classes.price}>Rp.{price}</p>
          <p className={classes.sold}>{sold} items</p>
        </div>
      </div>
    </div>
  );
}

ProductHead.propTypes = {
  img: PropTypes.string,
  price: PropTypes.number,
  sold: PropTypes.number,
  name: PropTypes.string,
}
