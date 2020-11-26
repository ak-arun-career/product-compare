import styled from 'styled-components';

import Button from './Button/Button';
import PreviewImage from './PreviewImage/PreviewImage';
import ProductPriceTag from './ProductPriceTag/ProductPriceTag';

const StyledProductPreview = styled.div`
    ${'' /* width: 9rem; */}
    height: 9rem;
    border: 1px dotted royalblue;
    position: relative;
    padding: 1rem;
`;

const StyledProductTitle = styled.div`
    color: royalblue;

`;

const productPreview = (props) => {
    return (
        <StyledProductPreview>
            {/* Product {props.children} Preview */}
            <Button></Button>
            <PreviewImage src=''>1</PreviewImage>
            <StyledProductTitle>Product title {props.children}</StyledProductTitle>
            <ProductPriceTag price='299.95' priceUnit='per stuk / excl. btw' />
        </StyledProductPreview>
    );
};

export default productPreview;