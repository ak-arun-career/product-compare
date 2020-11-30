/**
 * @description This file captures all the actions dispatched throughout the application
 */

import * as ActionTypes from './actions';
import * as Commons from '../util/common';

/**
 * Initial state of the application
 */
const initialstate = {
    products: [],
    productsSubset: [],
    featureRowData: [],
    featureRowDataAvailable: false
};

/**
 * @summary This is the main reducer function
 * @param {Object} state 
 * @param {Object} action 
 */
const reducer = (state = initialstate, action) => {
    switch(action.type) {
        /**
         * Case ADD_STATE
         * @summary This action is dispatched upon the initial fetch of data
         * The respective objects under the state are formatted and updated accordingly, and the updated state is returned
         */
        case ActionTypes.ADD_STATE: {
            //Updating the state
            let updatedState = {
                ...state,
                products: [...state.products, ...action.newState.newState.products],
                productsSubset: [...state.productsSubset, ...action.newState.newState.productsSubset],
                featureRowData: [...state.featureRowData, ...action.newState.newState.featureRowData],
                featureRowDataAvailable: action.newState.newState.featureRowDataAvailable
            };
            //Return the latest state
            return updatedState;
        }
        /**
         * Case DELETE_PRODUCT
         * @summary This action is dispatched
         * when the trash icon is clicked in the Product preview panel or
         * when a filter option is unchecked
         */
        case ActionTypes.DELETE_PRODUCT: {
            //Removing the product to be deleted from state.productsSubset
            let updatedArray = state.productsSubset.slice().filter((product) => {
                return product.Artikelnummer !== action.Artikelnummer;
            });
            //Formatting the subset of product data to generate the feature rows
            let formattedcurrentProducts = Commons.formatProducts(updatedArray);
            //Return the updated state
            return {
                ...state,
                productsSubset: updatedArray,
                featureRowData: formattedcurrentProducts
            }
        }
        /**
         * Case ADD_PRODUCT
         * @summary This action is dispatched when a filter option is checked
         */
        case ActionTypes.ADD_PRODUCT: {
            //Picking the product to be added to state.productsSubset
            let productToAdd = state.products.slice().filter((product) => {
                return product.Artikelnummer === action.artikel.nummer;
            });
            //Creating a copy of state.productsSubset
            let newproductsSubset = state.productsSubset.slice();
            //Inserting the product into it's original sequence within state.productsSubset
            newproductsSubset.splice(action.artikel.index, 0, productToAdd[0]);
            //Formatting the subset of product data to generate the feature rows
            let formattedcurrentProducts = Commons.formatProducts(newproductsSubset);
            //Return the updated state
            return {
                ...state,
                productsSubset: newproductsSubset,
                featureRowData: formattedcurrentProducts
            }
            
        }
        /**
         * Case default
         */
        default: return state;
    }
}

export default reducer;