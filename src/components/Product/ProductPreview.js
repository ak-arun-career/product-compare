/**
 * @description This 'ProductPreview' component is designed to provide a preview of the product, which includes an image, title and price.
 */
import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from './CardMedia/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import ProductPriceTag from './ProductPriceTag/ProductPriceTag';

import styles from './ProductPreview.module.css';
import { unitText } from '../../util/constants';
import { isDisabled } from '../../util/common';

const ProductPreview = (props) => {
    return (
        <Card elevation={0}>
            <CardHeader
                action={
                    <IconButton
                        aria-label="settings"
                        onClick={props.clicked}
                        disabled={isDisabled(props.details.Artikelnummer, props.productsSubset)}>
                        <Delete className={isDisabled(props.details.Artikelnummer, props.productsSubset) ? styles.disabled : styles.enabled}/>
                    </IconButton>
                }
            />
            <CardMedia
                className={styles.media}
                src={props.details.ProductImage}
                alt={`Preview not available`}
            />
            <CardContent>
                <div className={styles.royalblue}>{props.details.Name}</div>
                <ProductPriceTag price={props.details.SalePrice} priceUnit={unitText} />
            </CardContent>
        </Card>
    );
}

export default ProductPreview;