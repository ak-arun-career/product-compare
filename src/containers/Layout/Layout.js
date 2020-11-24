import styled from 'styled-components';

import FilterPanel from '../../components/FilterPanel/FilterPanel';
import ProductPreview from '../../components/ProductPreview/ProductPreview';

const StyledLayout = styled.table`
    border: 1px solid royalblue;
    width: 100%;
    display: grid;
`;

const StyledFilterTitle = styled.div`
    color: royalblue;
    font-weight: bold;
    font-size: 1.2rem;
`;

const layout = () => (
    <StyledLayout>
        <tr>
            <td>
                <StyledFilterTitle>Je selectie</StyledFilterTitle>
                <FilterPanel>1</FilterPanel>
                <FilterPanel>2</FilterPanel>
                <FilterPanel>3</FilterPanel>
                <FilterPanel>4</FilterPanel>
            </td>
            <th><ProductPreview>1</ProductPreview></th>
            <th><ProductPreview>2</ProductPreview></th>
            <th><ProductPreview>3</ProductPreview></th>
            <th><ProductPreview>4</ProductPreview></th>
        </tr>
        <tr>
            <td>Row Title 1</td>
            <td>Product 1.1 description</td>
            <td>Product 1.2 description</td>
            <td>Product 1.3 description</td>
            <td>Product 1.4 description</td>
        </tr>
        <tr>
            <td>Row Title 2</td>
            <td>Product 2.1 description</td>
            <td>Product 2.2 description</td>
            <td>Product 2.3 description</td>
            <td>Product 2.4 description</td>
        </tr>
        <tr>
            <td>Row Title 3</td>
            <td>Product 3.1 description</td>
            <td>Product 3.2 description</td>
            <td>Product 3.3 description</td>
            <td>Product 3.4 description</td>
        </tr>
    </StyledLayout>
);

export default layout;