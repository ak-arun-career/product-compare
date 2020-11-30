import styled from 'styled-components';

const StyledImage = styled.img`
    height: 2rem;
    padding: 0 0.2rem
`;

const badge = (props) => (
    <StyledImage
        src={props.src}
        alt={props.alt} />
);
    
export default badge;