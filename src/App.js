import styled from 'styled-components';
import Layout from './containers/Layout/Layout';

const StyledApp = styled.div`
  min-width: 1024px;
  overflow-x: auto;
`;

const App = () => {
  return (
    <StyledApp>
		  <Layout />
    </StyledApp>
  );
};

export default App;
