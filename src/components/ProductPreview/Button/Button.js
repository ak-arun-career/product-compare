// import styled from 'styled-components';
// const StyledButton = styled.button`
//     position: absolute;
//     top: 1rem;
//     right: 1rem;
// `;
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const button = () => {
    return (
        <IconButton
            style={{position: 'absolute', top: '1rem', right: '1rem'}}
            aria-label="Delete" component="span">
          <DeleteIcon color='secondary' fontSize='large' />
        </IconButton>
    );
}

export default button;