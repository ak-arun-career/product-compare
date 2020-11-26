import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

import Paper from '@material-ui/core/Paper';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import ProductPreviewMaterial from '../../components/Product/ProductPreviewMaterial';
import FeatureRow from '../../components/Product/FeatureRow/FeatureRow';

import classes from './Layout.module.css';
import * as ActionTypes from '../../store/actions';
import Title from '../../components/UI/Title/Title';
import { title } from '../../util/constants';
import BadgeImage from '../../components/Product/Badge/Badge';
import FeatureCell from '../../components/Product/FeatureRow/FeatureCell/FeatureCell';
import { productCountIndicator } from '../../util/common';

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
	allProducts.map((product, index) => (
		Object.keys(product).map(key => {
			let tempKey = key.charAt(0).toUpperCase() + key.slice(1)
			if(sortedProducts[index] === undefined) {
				sortedProducts[index] = {};
			}
			sortedProducts[index][tempKey] = product[key];
		})
	));

	/**Sorted feature keys array */
	const sortedFeatureKeys = Object.keys(sortedProducts[0]).sort();

	/**Action dispatched to update the redux store with the  latest state */
	this.props.dispatchStateData({
		type: ActionTypes.ADD_STATE,
		newState: {...this.state,
			products: sortedProducts,
			sortedFeatureKeys: sortedFeatureKeys,
			isFeaturedKeysAvailable: true
		}
	});
};
	/** The default render method */
	render() {
		/**
		 * @method renderBadgeImage
		 * @summary Render method for badge images 
		 * A convenience method which renders badge images per product chosen for comparison
		 * @param {Array} badgeImages - Array of badge images
		 * @param {Integer} featuredKeyIndex - Index of the product row
		 * @param {Integer} index - index of the badge image in the badgeImages array
		 */
		const renderBadgeImage = ((badgeImages, featuredKeyIndex, index) => (
			badgeImages.map((imgUrl, imgIndex) => (
				<BadgeImage
					key={`${featuredKeyIndex}_${index}_${imgIndex}`}
					src={imgUrl}
					alt={featuredKeyIndex.Name} />
			))
		));
		
		/**
		 * @method renderFeatureCell
		 * @param {*} featuredKeyIndex 
		 */
		const renderFeatureCell = (featuredKeyIndex) => (
			this.props.products.map((product, index) => {
				if(featuredKeyIndex === 'Badges') {
					return(
						<FeatureCell
							style={{padding: '0.5rem'}}
							className={product.Display ? null : classes.hide}
							key={`${featuredKeyIndex}_${index}`}>
								{renderBadgeImage(product[featuredKeyIndex].split('|'), featuredKeyIndex, index)}
						</FeatureCell>
					);
				} else {
					return(
						<FeatureCell
							style={{padding: '0.5rem'}}
							className={product.Display ? null : classes.hide}
							key={`${featuredKeyIndex}_${index}`}>
								{product[featuredKeyIndex]}
						</FeatureCell>
					);
				}
			})
		);

		let renderedTableRows = null;

		if(this.props.isFeaturedKeysAvailable) {
      /** Looping over the sortedFeatureKeys array */
			renderedTableRows = this.props.sortedFeatureKeys.map((featureKey, index) => {
				if(featureKey !== 'Name' && featureKey !== 'SalePrice' &&
					featureKey !== 'ProductImage' && featureKey !== 'Atp' &&
					featureKey !== 'Channel' && featureKey !== 'Display' &&
					featureKey !== 'BUP_UOM' && featureKey !== 'BUP_Value' &&
					featureKey !== 'Uom' && featureKey !== 'GrossPrice' &&
					featureKey !== 'ManufacturerName' && featureKey !== 'MinQuantity' &&
					featureKey !== 'Sku' && featureKey !== 'ListPrice' &&
					featureKey !== 'Channel' && featureKey !== 'ManufacturerImage' && featureKey !== 'BUP_Conversion' ) {
					return (
						<FeatureRow key={`${featureKey}__${index}`}>
							<FeatureCell style={{padding: '0.5rem', borderRight: '1px solid #cfcfcf'}}>
								{featureKey}
							</FeatureCell>
							{renderFeatureCell(featureKey)}
						</FeatureRow>
					);
				}
			});
		}

		/**
		 * Default return called under the render method 
		 */
		return (
			<Fragment>
				<Title title={`${productCountIndicator(this.props.products)} ${title}`} />
				<TableContainer component={Paper} elevation={0} >
				<Table aria-label="customized table">
					<TableHead>
						<FeatureRow>
							<FeatureCell style={{minHeight: '300px', padding: '0.5rem', borderRight: '1px solid #cfcfcf'}}>
								<FilterPanel
									{...this.props}
								/>
							</FeatureCell>
							{this.props.products.map((product) => {
								return(
									<FeatureCell style={{padding: 0}} className={product.Display ? null : classes.hide} key={product.Artikelnummer}>
										<ProductPreviewMaterial
											show={this.props.showProduct}
											details={product}
											clicked={() => this.props.onShowHideProduct(product.Artikelnummer)}
											disabled={(product.Display && productCountIndicator(this.props.products) < 3) ? true : false}
										/>
									</FeatureCell>
								);
							})}
						</FeatureRow>
					</TableHead>
					<TableBody>
						{renderedTableRows}
					</TableBody>
				</Table>
				</TableContainer>
			</Fragment>
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
		sortedFeatureKeys: state.sortedFeatureKeys,
		isFeaturedKeysAvailable: state.isFeaturedKeysAvailable,
	}
};

/**
 * @method mapDispatchToProps
 * @summary method used to dispatch actions to the reducer via component actions
 * @param {Function} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
	return {
		onShowHideProduct: (Artikelnummer) => dispatch({type: ActionTypes.SHOW_HIDE_PRODUCT, Artikelnummer: Artikelnummer}),
		dispatchStateData: (newState) => dispatch({type: ActionTypes.ADD_STATE, newState:newState})
	}
};

/** connect method being used to return a function which acts as a HOC to 'Layout' companent */
export default connect(mapStateToProps, mapDispatchToProps)(Layout);