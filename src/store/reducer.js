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
        case ActionTypes.ADD_STATE: {
            let updatedState = {
                ...state,
                products: [...state.products, ...action.newState.newState.products],
                productsSubset: [...state.productsSubset, ...action.newState.newState.productsSubset],
                featureRowData: [...state.featureRowData, ...action.newState.newState.featureRowData],
                featureRowDataAvailable: action.newState.newState.featureRowDataAvailable
            };
            return updatedState;
        }
        case ActionTypes.DELETE_PRODUCT: {
            let updatedArray = state.productsSubset.slice().filter((product) => {
                return product.Artikelnummer !== action.Artikelnummer;
            });
            let formattedcurrentProducts = Commons.formatProducts(updatedArray);
            
            return {
                ...state,
                productsSubset: updatedArray,
                featureRowData: formattedcurrentProducts
            }
        }
        case ActionTypes.ADD_PRODUCT: {
            let productToAdd = state.products.slice().filter((product) => {
                return product.Artikelnummer === action.artikel.nummer;
            });

            let newproductsSubset = state.productsSubset.slice();
            newproductsSubset.splice(action.artikel.index, 0, productToAdd[0]);
            let formattedcurrentProducts = Commons.formatProducts(newproductsSubset);

            return {
                ...state,
                productsSubset: newproductsSubset,
                featureRowData: formattedcurrentProducts
            }
            
        }
        default: return state;
    }
}

export default reducer;