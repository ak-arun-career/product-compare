import styled from 'styled-components';

const StyledTitle = styled.h3`
    padding: 1rem;
    font-weight: bold;
    color: royalblue;
    font-size: 1.5rem;
    margin: 0;
    border-bottom: 1px solid #dedede;
`;

const title = (props) => {
     return <StyledTitle>{props.title}</StyledTitle>
};

export default title;