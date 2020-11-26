import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import { filterPanelTitle } from '../../util/constants';
import { productCountIndicator } from '../../util/common';

const filterPanel = (props) => {  
  return (
      <List>
          <Typography variant="h5" style={{color: 'royalblue'}}>
              {filterPanelTitle}
            </Typography>
          {props.products.map((product) => {
            const labelId = `checkbox-list-label-${product.Name}`;
            return(
              <ListItem
                style={{padding: '0.5rem 0'}}
                disabled={(product.Display && productCountIndicator(props.products) < 3) ? true : false}
                key={product.Name}
                dense
                button
                onClick={() => props.onShowHideProduct(product.Artikelnummer)}>
                <ListItemIcon style={{minWidth: '1rem'}}>
                  <Checkbox
                    style={{color:'royalblue'}}
                    edge="start"
                    checked={product.Display}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={product.Name} />
              </ListItem>
            );
          })}
      </List>
  );
}

export default filterPanel;