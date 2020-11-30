/**
 * @description This 'Layout' component is a major component of the app.
 * This component manages the state of the whole application.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Table, TableHead, TableBody, TableContainer, Paper} from '@material-ui/core';

import FilterPanel from '../../components/FilterPanel/FilterPanel';
import ProductPreview from '../../components/Product/ProductPreview';
import FeatureRow from '../../components/Product/FeatureRows/FeatureRow/FeatureRow';

import classes from './Layout.module.css';
import * as ActionTypes from '../../store/actions';
import Title from '../../components/UI/Title/Title';
import * as Constants from '../../util/constants';
import FeatureCell from '../../components/Product/FeatureRows/FeatureRow/FeatureCells/FeatureCell/FeatureCell';
import { formatProducts } from '../../util/common';
import FeatureRows from '../../components/Product/FeatureRows/FeatureRows';

class Layout extends Component {
	/**
	 * @method componentDidMount
	 * @summary Lifecycle method triggered on load of component
	 * @description
	 * This lifecycle method is used to fetch data on page load.
	 * Upon a successful data fetch, an aciton is dispatched to update the state
	 */
	componentDidMount() {
		/** axios: HTTP client */
		axios.get('https://5f993a3050d84900163b845a.mockapi.io/eriks/products/all')
		/** Success block */
		.then(response => {
			/** The fetch product data is formatted **/
			this.formatProductsData(response.data.products);
		})
		/** Error block */
		.catch(error => {
			console.log(error);
		});
	}

	/**
	 * @method formatProductsData
	 * @summary Utility method
	 * @description used to format data for efficient consumption by the component tree
	 * @param {*} products 
	 */
	formatProductsData = (products) => {
		let allProducts = products;
		let sortedProducts = [];
		
		/** Iterating through allProducts array to create an array of objects suiting the component tree needs */
		allProducts.map((product, index) => {
			Object.keys(product).map(key => {
				let tempKey = key.charAt(0).toUpperCase() + key.slice(1)
				if(sortedProducts[index] === undefined) {
					sortedProducts[index] = {};
				}
				sortedProducts[index][tempKey] = product[key];
			})
		});

		// console.log('products:\n',sortedProducts);
		// console.log('productsSubset:\n',sortedProducts);
		// console.log('featureRowData:\n', formatProducts(sortedProducts));

		/**Action dispatched to update the redux store with the  latest state */
		this.props.dispatchStateData({
			type: ActionTypes.ADD_STATE,
			newState: {...this.state,
				products: sortedProducts,//Original data
				productsSubset: sortedProducts,//Subset of original data (original data with filters applied)
				featureRowData: formatProducts(sortedProducts),//filtered data with sorted to generate feature rows
				featureRowDataAvailable: true
			}
		});
	};

	/**
	 * onFilterOptionClicked
	 * @summary This method triggers the show/hide of a product when a filter option checkbox is toggled
	 * @param {Object} event 
	 */
	onFilterOptionClicked = (event) => {
		event.stopPropagation();
		let checked = event.target.checked;
		let artikelnummer = event.target.value;
		let index = event.target.tabIndex;

		return checked ? this.props.onShowProduct(artikelnummer, index) : this.props.onHideProduct(artikelnummer);
	};

	/** The default render method */
	render() {
		let renderedTableRows = null;
		if(this.props.featureRowDataAvailable) {//Wait until data is set to the state
			/**
			 * @summary This constant contains the list of rendered feature rows generates from props.featureRowData
			 */
			renderedTableRows = <FeatureRows products = {this.props.featureRowData} />
		}

		/**
		 * @summary This constant contains the ist of rendered Product preview panels from props.productSubset
		 */
		const productPreviewCells = this.props.productsSubset.map((product) => {
			return(
				<FeatureCell className={classes.FeaturePreview} key={product.Artikelnummer}>
					<ProductPreview
						{...this.props}
						details={product}
						clicked={() => this.props.onHideProduct(product.Artikelnummer)}
					/>
				</FeatureCell>
			);
		});

		/**
		 * @summary Default return called under the render method 
		 */
		return (
			<div className={classes.Layout}>
				<Title title={`${this.props.productsSubset.length} ${Constants.title}`} />
				<TableContainer component={Paper} elevation={0} >
				<Table aria-label="customized table">
					<TableHead>
						<FeatureRow>
							<FeatureCell className={classes.FilterPanel}>
								<FilterPanel
									{...this.props}
									onChange={(event) => this.onFilterOptionClicked(event)}
								/>
							</FeatureCell>
							{productPreviewCells}
						</FeatureRow>
					</TableHead>
					<TableBody>
						{renderedTableRows}
					</TableBody>
				</Table>
				</TableContainer>
			</div>
		);
	}
};

/**
 * @method mapStateToProps
 * @summary method used to map the state to the component's props
 * @param {Object} state 
 * @return {Object} new state
 */
const mapStateToProps = (state) => {
	return {
		products: state.products,
		productsSubset: state.productsSubset,
		featureRowData: state.featureRowData,
		featureRowDataAvailable: state.featureRowDataAvailable,
	}
};

/**
 * @method mapDispatchToProps
 * @summary method used to dispatch actions to the reducer via component actions
 * @param {Function} dispatch :the dispatched action
 */
const mapDispatchToProps = (dispatch) => {
	return {
		onHideProduct: (Artikelnummer) => dispatch({
			type: ActionTypes.DELETE_PRODUCT,
			Artikelnummer: Artikelnummer
		}),
		onShowProduct: (Artikelnummer, index) => dispatch({
			type: ActionTypes.ADD_PRODUCT,
			artikel: {
				nummer: Artikelnummer,
				index: index
			}
		}),
		dispatchStateData: (newState) => dispatch({
			type: ActionTypes.ADD_STATE,
			newState:newState
		})
	}
};

/**
 * @summary the `connect` method being used to return a function which acts as a HOC,
 *  and passes `mapStateToProps` and `mapDispatchToProps` to this Layout companent
 */
export default connect(mapStateToProps, mapDispatchToProps)(Layout);