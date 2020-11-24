import React, {Fragment} from 'react';

const checkBox = (props) => {
    return(
        <Fragment>
            <input type='checkbox' value='Product title 1' />
            <label style={{fontWeight: 'bold'}}>Product title {props.children}</label>
        </Fragment>
        
        );
};

export default checkBox;