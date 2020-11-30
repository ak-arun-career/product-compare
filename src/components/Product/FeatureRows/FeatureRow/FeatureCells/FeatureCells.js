/**
 * @description This 'featureCells' component provides an array of feature cells per feature row.
 */
import { Fragment } from 'react';
import FeatureCell from './FeatureCell/FeatureCell';
import styles from './FeatureCells.module.css';
import Badge from './FeatureCell/Badge/Badge';

const featureCells = (props) => {

    /**
     * @method renderBadgeImage
     * @summary Render method for badge images for a FeatureCell
     * A convenience method which renders badge images per product chosen for comparison
     * @param {Array} badgeImages - Array of badge images
     * @param {Integer} featuredKeyIndex - Index of the product row
     * @param {Integer} index - index of the badge image in the badgeImages array
     */
    const renderBadgeImage = (badgeImages, featuredKeyIndex, index) => (
        badgeImages.map((imgUrl, imgIndex) => (
            <Badge
                key={`${featuredKeyIndex}_${index}_${imgIndex}`}
                src={imgUrl}
                alt={featuredKeyIndex.Name} />
        ))
    );
    
    /**
     * @method renderFeatureCell
     * @summary Main method to render the Feature cells per FeatureRow
     * @param {*} featuredKeyIndex 
     */
    const featureCells = (rowValues, rowName) => (
        rowValues.map((rowValue, index) => {
            if(rowName === 'Badges') {
                return (
                    <FeatureCell
                        className={styles.FeatureRow}
                        key={`${rowValue}_${index}`}>
                        {renderBadgeImage(rowValue.split('|'), rowName, index)}
                    </FeatureCell>
                );
            }
            else {
                return (
                    <FeatureCell
                        className={styles.FeatureRow}
                        key={`${rowValue}_${index}`}>
                        <span>{rowValue}</span>
                    </FeatureCell>
                );
            }
        })
    );

    return(
        <Fragment>
            {
                featureCells(props.rowValues, props.rowName)
            }
        </Fragment>
        
    );
};

export default featureCells;