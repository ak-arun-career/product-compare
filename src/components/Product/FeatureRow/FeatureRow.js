import TableRow from '@material-ui/core/TableRow';

const featureRow = (props) => (
    <TableRow>
        {props.children}
    </TableRow>
);

export default featureRow;