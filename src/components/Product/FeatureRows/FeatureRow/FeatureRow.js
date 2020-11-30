/**
 * @description This 'featureRow' component provides one feature rows.
 */
import TableRow from '@material-ui/core/TableRow';

const featureRow = (props) => (
    <TableRow className={props.className}>
        {props.children}
    </TableRow>
);

export default featureRow;