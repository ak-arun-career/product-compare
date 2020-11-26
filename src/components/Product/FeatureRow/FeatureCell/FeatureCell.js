import TableCell from '@material-ui/core/TableCell';

const featureCell = (props) => (
    <TableCell
        style={props.style}
        className={props.className}>
            {props.children}
    </TableCell>
);

export default featureCell;

