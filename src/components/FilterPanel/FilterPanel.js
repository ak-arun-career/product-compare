/**
 * @description This 'FilterPanel' component is designed to provide a filter panel on the app.
 */

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import { filterPanelTitle } from '../../util/constants';
import { isDisabled } from '../../util/common';
import styles from './FilterPanel.module.css';

const filterPanel = (props) => {  
  
  /**
   * @description A method used to set the checked property of a filter option based on the values in the props.productSubset array
   * @param {String} keyName 
   * @param {Array} arrayName 
   */
  const setChecked = (keyName, arrayName) => {
    for (let i=0; i < arrayName.length; i++) {
      if (arrayName[i].Artikelnummer === keyName) {
          return true;
      }
    }
  };

  return (
      <List>
          <Typography variant="h5" className={styles.Title}>
            {filterPanelTitle}
          </Typography>
          {props.products.map((product, index) => {
            return(
              <ListItem
                className={styles.ListItem}
                key={product.Name}
                dense
                button
                onChange={props.onChange}
                >
                <ListItemIcon className={styles.ListIcon}>
                  <Checkbox
                    className={isDisabled(product.Artikelnummer, props.productsSubset) ? styles.disabled : styles.enabled}
                    edge="start"
                    checked={ setChecked(product.Artikelnummer, props.productsSubset) ? true : false}
                    disabled={isDisabled(product.Artikelnummer, props.productsSubset)}
                    disableRipple
                    value={product.Artikelnummer}
                    inputProps={{tabIndex: index}}
                  />
                </ListItemIcon>
                <ListItemText primary={product.Name} />
              </ListItem>
            );
          })}
      </List>
  );
}

export default filterPanel;