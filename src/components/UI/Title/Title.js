/**
 * @description This 'Title' component generates the title of the app.
 */
import styled from 'styled-components';

const StyledTitle = styled.h3`
    padding: 1rem;
    padding-left: 0;
    font-weight: bold;
    color: royalblue;
    font-size: 2rem;
    margin: 0;
    border-bottom: 1px solid #dedede;
`;

const title = (props) => {
     return <StyledTitle>{props.title}</StyledTitle>
};

export default title;