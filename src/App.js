import styled from 'styled-components';
import LayoutMaterialTable from './containers/Layout/LayoutMaterialTable';

const StyledApp = styled.div`
  min-width: 1024px;
  overflow-x: auto;
`;

const App = () => {
  return (
    <StyledApp>
		  <LayoutMaterialTable />
    </StyledApp>
  );
};

export default App;
