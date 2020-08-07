import React from 'react';
import { Product } from './Product';
import { ProductHead } from './ProductHead';
import Card from '@material-ui/core/Card';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import danone from '@/assets/images/frisianflag.png';

const useStyles = makeStyles(() => ({
  productsContainer: {
    boxShadow: '0px 2px 6px #0000000A',
    border: '0.5px solid #CACED5',
    borderRadius: '2px',
    padding: '16px',
    margin: '16px 16px 0 0',
    minWidth: '275px'
  },
  productsHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  flexGrow: {
    flexGrow: 1,
  },
}));

export function ProductList() {
  const classes = useStyles();

  const list = [
    {
      image: danone,
      name: 'Danone Milk',
      price: 3000,
      sold: 23,
    },
    {
      image: danone,
      name: 'Danone Milk',
      price: 3000,
      sold: 23,
    },
    {
      image: danone,
      name: 'Danone Milk',
      price: 3000,
      sold: 23,
    },
    {
      image: danone,
      name: 'Danone Milk',
      price: 3000,
      sold: 23,
    },
    {
      image: danone,
      name: 'Danone Milk',
      price: 3000,
      sold: 23,
    },
  ]

  const mappedList = list.map((l, idx) => {
    if(idx === 0) {
      return (
        <ProductHead
          key={idx}
          img={l.image}
          name={l.name}
          price={l.price}
          sold={l.sold}
        />
      )
    }
    return (
      <Product
        key={idx}
        img={l.image}
        name={l.name}
        price={l.price}
        sold={l.sold}
      />
    )
  })

  return (
    <Card className={classes.productsContainer}>
      <div className={classes.productsHeader}>
        <Typography variant='h6' color='initial'>BEST SELLING SKU</Typography>
        <div className={classes.flexGrow} />
        <MoreVertIcon style={{ color: '#6A6A6A', fontSize: '20px' }} />
      </div>
      { mappedList }
    </Card>
  );
}


