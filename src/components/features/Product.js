import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  productContainer: {
    border: '0.5px solid #C5C5C59C',
    borderRadius: '4px',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '8px',
  },
  imageContainer: {
    width: '60px',
    height: '60px',
  },
  image: {
    width: '100%',
    height: '100%'
  },
  contentContainer: {
    boxSizing: 'border-box',
    width: 'calc(100% - 76px)',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 8px',
  },
  name: {
    width: '100%',
    fontWeight: 'normal',
    fontSize: '20px',
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
    fontSize: '16px',
    letterSpacing: '0.22px',
    color: '#00000099'
  },
  sold: {
    margin: 0,
    fontWeight: 400,
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: '16px',
    letterSpacing: '0.22px',
    color: '#00000099',
    marginRight: '24px'
  }
}));

export function Product (props) {
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

Product.propTypes = {
  img: PropTypes.string,
  price: PropTypes.number,
  sold: PropTypes.number,
  name: PropTypes.string,
}
