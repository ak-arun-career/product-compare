import styled from 'styled-components';

const StyledPreviewImage = styled.img`
    outline: none;
`;

const previewImage = (props) => (
    <StyledPreviewImage
        src={props.src}
        alt='Image not available'
        onError={props.onImageLoadingError}    
    />
);

export default previewImage;