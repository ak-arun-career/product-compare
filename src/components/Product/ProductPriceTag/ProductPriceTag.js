/**
 * @description This 'productPriceTag' component provides a price tag component per product preview panel.
 */
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
        <>
            <StyledPriceTag>{props.price}</StyledPriceTag>
            <StyledPriceUnitDescription>{props.priceUnit}</StyledPriceUnitDescription>
        </>
    );
};

export default productPriceTag;