/**
 * @description This 'featureRows' component provides a array of feature rows.
 */
import FeatureRow from './FeatureRow/FeatureRow';
import FeatureCells from './FeatureRow/FeatureCells/FeatureCells';
import FeatureCell from './FeatureRow/FeatureCells/FeatureCell/FeatureCell';
import { sortArrayOfObjects, unshiftObjInArray } from '../../../util/common';
import styles from './FeatureRows.module.css';


const featureRows = (props) => {

    const products = props.products;
    let sortedfeatureRowData = sortArrayOfObjects(products)
    sortedfeatureRowData = unshiftObjInArray(sortedfeatureRowData, 'Badges');

    /**
     * renderedTableRows
     * @summary Renders thea FeatureRow per product feature
     */
    let renderedTableRows = sortedfeatureRowData.map((product, index) => {
        if(product.rowName !== 'Name' && product.rowName !== 'SalePrice' &&
        product.rowName !== 'ProductImage' && product.rowName !== 'Atp'&& product.rowName !== 'Display') {
            return (
                <FeatureRow key={`${product.rowName}__${index}`} className={product.highlightRow ? styles.gray : null}>
                    <FeatureCell className={styles.FeatureLabel} style={{borderRight: '1px solid #efefef'}}>
                        {product.rowName}
                    </FeatureCell>
                    <FeatureCells 
                        rowValues={product.rowValues}
                        rowName={product.rowName}
                    />
                </FeatureRow>
            );
        }
    });

    return (
        <>
            {renderedTableRows}
        </>
        
    )

};

export default featureRows;