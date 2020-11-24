import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FilterPanelMaterial from '../../components/FilterPanel/FilterPanelMaterial';
import ProductPreviewMaterial from '../../components/ProductPreview/ProductPreviewMaterial';

import classes from './Layout.module.css';
import * as ActionTypes from '../../store/actions';
import Title from '../../components/UI/Title/Title';
import { title } from '../../util/constants';

class LayoutMaterialTable extends Component {
	componentDidMount() {
		axios.get('https://5f993a3050d84900163b845a.mockapi.io/eriks/products/all')
			.then(response => {
				this.fetchSubsetOfProductsArray(response.data.products);
			})
			.catch(error => {
			   console.log(error);
			});
	}

	fetchSubsetOfProductsArray = (products) => {
	let allProducts = products;
	let sortedProducts = [];
	
	allProducts.map((product, index) => (
		Object.keys(product).map(key => {
			let tempKey = key.charAt(0).toUpperCase() + key.slice(1)
			if(sortedProducts[index] === undefined) {
				sortedProducts[index] = {};
			}
			sortedProducts[index][tempKey] = product[key];
		})
	));

	const allKeys = Object.keys(sortedProducts[0]);
	
	const sortedFeatureKeys = allKeys.sort();
	this.props.dispatchStateData({
		type: ActionTypes.ADD_STATE,
		newState: {...this.state,
			products: sortedProducts,
			sortedFeatureKeys: sortedFeatureKeys,
			isFeaturedKeysAvailable: true
		}
	});
};
	
	render() {
		const renderBadgeImage = ((badgeImages,featuredKeyIndex,index) => (
			badgeImages.map((imgUrl, imgIndex) => (
				<img
					key={`${featuredKeyIndex}_${index}_${imgIndex}`}
					style={{height: '2rem', padding: '0 0.2rem'}}
					src={imgUrl}
					alt={featuredKeyIndex.Name} />
			))
		));

		const renderTableCell = (featuredKeyIndex) => (
			this.props.products.map((product, index) => {
				if(featuredKeyIndex === 'Badges') {
					return(
						<TableCell
							style={{padding: '0.5rem'}}
							className={product.Display ? null : classes.hide}
							key={`${featuredKeyIndex}_${index}`}>
								{renderBadgeImage(product[featuredKeyIndex].split('|'), featuredKeyIndex, index)}
						</TableCell>
					);
				} else {
					return(<TableCell style={{padding: '0.5rem'}} className={product.Display ? null : classes.hide} key={`${featuredKeyIndex}_${index}`}>{product[featuredKeyIndex]}</TableCell>);
				}
			})
		);

		let renderedTableRows = null;

		if(this.props.isFeaturedKeysAvailable) {
			renderedTableRows = this.props.sortedFeatureKeys.map((featureKey, index) => {
				if(featureKey !== 'Name' && featureKey !== 'SalePrice' &&
					featureKey !== 'ProductImage' && featureKey !== 'Atp' &&
					featureKey !== 'Channel' && featureKey !== 'Display' &&
					featureKey !== 'BUP_UOM' && featureKey !== 'BUP_Value' &&
					featureKey !== 'Uom' && featureKey !== 'GrossPrice' &&
					featureKey !== 'ManufacturerName' && featureKey !== 'MinQuantity' &&
					featureKey !== 'Sku' && featureKey !== 'ListPrice' &&
					featureKey !== 'Channel' && featureKey !== 'ManufacturerImage' && featureKey !== 'BUP_Conversion' ) {
					return(
						<TableRow key={`${featureKey}__${index}`}>
							<TableCell style={{padding: '0.5rem', borderRight: '1px solid #cfcfcf'}}>{featureKey}</TableCell>
							{renderTableCell(featureKey)}
						</TableRow>
					)
				}
			});
		}

		const productCountIndicator = () => {
			let products = this.props.products;
			let productComparecounter = 0;

			products.forEach(product => {
				if(product.Display === true) {
					productComparecounter = productComparecounter + 1;
				}
			})

			return productComparecounter;
		};
	
		return (
			<Fragment>
				<Title title={`${productCountIndicator()} ${title}`} />
				<TableContainer component={Paper} elevation={0} >
				<Table aria-label="customized table">
					<TableHead>
						<TableRow>
							<TableCell style={{minHeight: '300px', padding: '0.5rem', borderRight: '1px solid #cfcfcf'}}>
								<FilterPanelMaterial
									{...this.props}
									details={this.props.products}/>
							</TableCell>
							{this.props.products.map((product) => {
								return(
									<TableCell style={{padding: 0}} className={product.Display ? null : classes.hide} key={product.Artikelnummer}>
										<ProductPreviewMaterial
											show={this.props.showProduct}
											details={product}
											clicked={() => this.props.onShowHideProduct(product.Artikelnummer)}
											disabled={(product.Display && productCountIndicator() < 3) ? true : false}
										/>
									</TableCell>
								);
							})}
						</TableRow>
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

const mapStateToProps = (state) => {
	return {
		products: state.products,
		sortedFeatureKeys: state.sortedFeatureKeys,
		isFeaturedKeysAvailable: state.isFeaturedKeysAvailable,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onShowHideProduct: (Artikelnummer) => dispatch({type: ActionTypes.SHOW_HIDE_PRODUCT, Artikelnummer: Artikelnummer}),
		dispatchStateData: (newState) => dispatch({type: ActionTypes.ADD_STATE, newState:newState})
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutMaterialTable);