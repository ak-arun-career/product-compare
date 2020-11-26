import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import ProductPriceTag from './ProductPriceTag/ProductPriceTag';

const useStyles = makeStyles((theme) => ({
    media: {
        'max-width': 100,
        'min-height': 100,
        margin: '0 auto'
    }
}));

const RecipeReviewCard = (props) => {
    const classes = useStyles();

    return (
        <Card elevation={0}>
            <CardHeader
                action={
                    <IconButton
                        aria-label="settings"
                        onClick={props.clicked}
                        disabled={props.disabled}>
                        <Delete style={{color: 'royalblue'}}/>
                    </IconButton>
                }
            />
            <CardMedia
                className={classes.media}
                image={props.details.ProductImage}
                src={props.details.ProductImage}
                alt='Image not available'
            />
            <CardContent>
                <div style={{color: 'royalblue'}}>{props.details.Name}</div>
                <ProductPriceTag price={props.details.SalePrice} priceUnit='per stuk / excl. btw' />       
            </CardContent>
        </Card>
    );
}

export default RecipeReviewCard;