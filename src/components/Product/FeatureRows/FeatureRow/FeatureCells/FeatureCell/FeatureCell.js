/**
 * @description This 'featureCell' component provides a singe feature cell.
 */
import TableCell from '@material-ui/core/TableCell';
import styles from './FeatureCell.module.css' ;

const featureCell = (props) => (
    <TableCell
        style={props.style}
        className={styles.FeatureLabel}>
            {props.children}
    </TableCell>
);

export default featureCell;

