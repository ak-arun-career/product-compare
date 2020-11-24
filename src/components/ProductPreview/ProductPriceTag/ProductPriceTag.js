import React, { Fragment } from 'react';
import styled from 'styled-components';

const StyledPriceTag = styled.span`
    font-weight: bold;
    color: black;
    font-size: 1.3rem;
    text-align: left;
`;

const StyledPriceUnitDescription = styled.div`
    color: #bcbcbc;
    font-size: 0.75rem;
`;

const productPriceTag = (props) => {
    return (
        <Fragment>
            <StyledPriceTag>{props.price}</StyledPriceTag>
            <StyledPriceUnitDescription>{props.priceUnit}</StyledPriceUnitDescription>
        </Fragment>
    );
};

export default productPriceTag;