import styled from 'styled-components';
import Layout from './containers/Layout/Layout';

const StyledApp = styled.div`
  min-width: 1024px;
  overflow-x: auto;
  padding: 1rem;
  border-bottom: 0.25rem solid royalblue;
  margin-bottom: 1rem;
`;

const App = () => {
  return (
    <StyledApp>
		  <Layout />
    </StyledApp>
  );
};

export default App;
