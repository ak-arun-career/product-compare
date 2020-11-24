import * as ActionTypes from './actions';

const initialstate = {
    products: [],
    //sortedProducts: [],
    sortedFeatureKeys: [],
    isFeaturedKeysAvailable: false
};


const reducer = (state = initialstate, action) => {
    switch(action.type) {
        case ActionTypes.ADD_STATE: {
            let updatedState = {
                ...state,
                products: [...state.products, ...action.newState.newState.products],
                //sortedProducts: [...state.sortedProducts, action.newState.newState.sortedProducts],
                sortedFeatureKeys: [...state.sortedFeatureKeys, ...action.newState.newState.sortedFeatureKeys],
                isFeaturedKeysAvailable: action.newState.newState.isFeaturedKeysAvailable
            };
            return updatedState;
        }
        
        case ActionTypes.SHOW_HIDE_PRODUCT: {
            let currentProductsArray = state.products.slice();

            currentProductsArray.map((product) => {
                if(product.Artikelnummer === action.Artikelnummer) {
                    product.Display = !product.Display;
                }
            });
            console.log(currentProductsArray);
            return {
                ...state,
                products: currentProductsArray
            }
        }
        default: return state;
    }
}

export default reducer;