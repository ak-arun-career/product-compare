import * as Constants from './constants';

/**
 * @method unshiftObjInArray
 * @summary A utility method used to push an object to the beginning of an array
 * @param 
 * @returns {Array} arrayOfObjects
 */
export const unshiftObjInArray = (arrayOfObjects, keyToBeUnshifted) => {
	let objToBeUnshifted = null;
	for (let key in arrayOfObjects) {
		if (arrayOfObjects[key].rowName === keyToBeUnshifted) {
			objToBeUnshifted = arrayOfObjects[key];
			delete arrayOfObjects[key];
			arrayOfObjects.unshift(objToBeUnshifted);
		}
	}

	return arrayOfObjects;
};

/** sortArrayOfObjects
 * @summary A utility method to sort an array of objects alhabetically based on the 'rowName' key
 * @param {Array} array 
 */
export const sortArrayOfObjects = (array) => {
	array.sort((objA, objB) => {
		let fa = objA.rowName.toLowerCase(),
			fb = objB.rowName.toLowerCase();
	
		if (fa < fb) {
			return -1;
		}
		if (fa > fb) {
			return 1;
		}
		return 0;
	});

	return array;
};

/**
 * addObjToArray
 * @summary This utility method is used to add a given object to an array
 * @param {Array} arr 
 * @param {String} name 
 * @param {Object} obj 
 */
export const addObjToArray = (arr, name, obj) => {
	const found = arr.some(el => el.rowName === name);
	if (!found) arr.push(obj);
	return arr;
};

/**
 * formatProducts
 * @summary This convenience method is used to format the product data fetched from the API endpoint and return the re-formatted data to generate the feature rows
 * @param {*} allProducts 
 */
export const formatProducts = (allProducts) => {
	const featureRowData = [];
	let upperCaseKey = '';

	allProducts.map(product => {
		Object.keys(product).map((key, index) => {
			upperCaseKey = key.charAt(0).toUpperCase() + key.slice(1);
			
			addObjToArray(featureRowData, upperCaseKey, {
				rowName: upperCaseKey,
				rowValues: [],
				highlightRow: false
			});
			featureRowData[index]['rowValues'].push(product[key]);
		});
	});

	//Excluded rows fetched from constants.js file
	let excludedRowsForHighlighting = Constants.excludedRowsForHighlighting;

	featureRowData.map(newProduct => {
		if (excludedRowsForHighlighting.indexOf(newProduct.rowName) === -1) {
			let rowValues = newProduct.rowValues;
			for (let i = 0; i < rowValues.length; i++) {
				if ((i < (rowValues.length - 1)) && (rowValues[i] !== rowValues[i + 1])) {
					newProduct.highlightRow = true;
					return;
				}
			}
		}
	});

	return featureRowData;
};

/**
 * @function isDisabled
 * @summary A util method used to return if a product/filter is disabled or not
 * @param {String} articleNummer 
 * @param {Array} productsSubset 
 */
export const isDisabled = (articleNummer, productsSubset) => {
	for (let i = 0; i < productsSubset.length; i++ ) {
		if(productsSubset.length < 3 && (productsSubset[i].Artikelnummer === articleNummer)) {
		return true;
		}
	}
};