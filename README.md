# Product Compare app

## Getting started
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Contents
- [Getting Started](#getting-started)
- [Functionality Overview](#functionality-overview)
- [Folder Structure](#folder-structure)
- [Project Dependencies](#project-dependencies)
- [IE11 Support](#supported-language-features-and-polyfills)


## Getting started

- Open Git Bash and navigate to the project directory using `cd product-compare/`

- In the project directory, you can run:

    `npm install` to install all required dependencies<br>
    `npm run start` to start the local server


- Run the app in the development mode.\
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `npm run build` to build the app for production to the `build` folder.\
    It correctly bundles React in production mode and optimizes the build for the best performance.
    The build is minified and the filenames include the hashes.\
    The app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Functionality Overview

This is a `Product Compare` application.
It uses the [/eriks/products/all](https://5f993a3050d84900163b845a.mockapi.io/eriks/products/all) API to fetch product data and present the user with a Compare View.


### General functionality
- All products are fetched upon the initial app load
- The Title, Filter Panel and Product Preview components are generated
- The feature rows are generated in alphabetical order of `Feature Name`, also preceded by the `Badges` feature name
- The differences in features between Product features are highlighted by decorating the feature row with a `gray` background color
    <u>NOTE</u>: The following rows have been omitted from the product feature comparison:
        - salePrice
        - manufacturerName
        - grossPrice
        - BUP_UOM
        - BUP_Value
        - uom
        - productImage
        - BUP_Conversion
        - minQuantity
        - manufacturerImage
        - name
        - sku
        - listPrice
        - channel
        - display
        - atp
- The products can be removed from the Product Compare grid by clicking on the Trash icon against each product
    - At any given time, only two products can be removed from the compare grid, so as to enable a sucessful 'compare' functionality
- The selection of products can be toggled selecting the checkbox options presented in the Filter panel
    - At any given time, only two filters can be unchecked, so as to enable a successful 'compare' functionality


### Architecture approach

    - The `<App />` (/App.js) is treated as the `base component`
    - The `<Layout />` [/containers/Layout.js] component holds the state
    - The app comprises of the following major building blocks
        - FilterPanel; built using the Material UI List component with Checkboxes
        - ProductPreview; built using the Material UI Card
        - FeatureRows; built using the Material UI TableRow and TableCell components
    - A Material UI Table forms the base of the Layout component
    - The `FilterPanel` and `ProductPreview` components occupy the top row of the table
    - The `FeatureRows` occupy the subsequent rows of the table
        - Each `FeatureRow` consists of the `Feature Name` at the first cell. The subsequent cells contain the `Value` for a feature name of each product respectively.
        - Values of each cell within a `Feature Row` (excluding the ommitted rows) are compared. The differences between values are indicated by highlighting the Feature Row in gray.



### State management approach
    
    - The data is fetched from the provided API endpoint using the `axios` utility.
    - A central data store is created in the index.js file using the `redux` utility
    - The initial state is defined and all dispatched actions are captured by the `reducer` function, as defined in the `./store/reducer.js` file
    - All 'action dispatchers' are handled by the `mapStateToProps` and `mapDispatchToProps` functions in the `./containers/Layout/Layout.js` file
    - All the actions are labelled as contants in the './store/actions.js' file, and imported in the action dispatch and reducer functions.
    - Following are the actions used in this application:
        - ADD_STATE --> this label is to dispatch an action upon initial fetch of the data from the API endpoint
        - ADD_PRODUCT --> this label is used to dispatch an action when a filter option is selected from the filter panel
        - DELETE_PRODUCT --> this label is used to dispatch an action when a filter is de-selected or a product is deleted from the comparison grid
    - Upon a successful data fetch, the data is formatted and stored as state in the following manner:
            `All Products` --> Original/Pure data set
            `Products Subset` --> Subset of original data after filters are applied (or) Product deleted from list
            `Feature Row data` --> Formatted data used to generate the feature rows
    - The helper functions used in formatting the above sets of data are imported from './util/common.js'



## Folder Structure

The following folder structure has been maintained for this application:

```
product-compare/
  README.md
  node_modules/
  package.json
  .gitignore
  public/
    index.html
    manifest.json
  src/
    App.css
    App.js
    index.css
    index.js
    setupTests.js
    components/
        FilterPanel/
            FilterPanel.js
            FilterPanel.module.css
        Product/
            ProductPreview.js
            ProductPreview.module.css
            CardMedia/
                CardMedia.js
            FeatureRows/
                FeatureRows.js
                FeatureRows.module.css
                FeatureRow/
                    FeatureRow.js
                    FeatureCells/
                        FeatureCells.js
                        FeatureCells.module.css
                        FeatureCell/
                            FeatureCell.js
                            FeatureCell.module.css
                            Badge/
                                Badge.js
            ProductPriceTag/
                ProductProceTag.js
    containers/
        Layout/
            Layout.js
            Layout.module.css
    fonts/
        Roboto.ttf files
    store/
        actions.js
        reducer.js
    util/
        common.js
        constants.js
```


## Project Dependencies
Following are the dependency packages required by this application to function

```
    "@material-ui/core": "^4.11.0",
    "@material-ui/icons": "^4.9.1",
    "axios": "^0.21.0",
    "install": "^0.13.0",
    "npm": "^6.14.9",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-redux": "^7.2.2",
    "react-scripts": "4.0.0",
    "redux": "^4.0.5",
    "styled-components": "^5.2.1"
```


## IE11 support

This project supports a superset of the latest JavaScript standard.<br>
In addition to [ES6](https://github.com/lukehoban/es6features) syntax features, it also supports:

* [Exponentiation Operator](https://github.com/rwaldron/exponentiation-operator) (ES2016).
* [Async/await](https://github.com/tc39/ecmascript-asyncawait) (ES2017).
* [Object Rest/Spread Properties](https://github.com/sebmarkbage/ecmascript-rest-spread) (stage 3 proposal).
* [Dynamic import()](https://github.com/tc39/proposal-dynamic-import) (stage 3 proposal)
* [Class Fields and Static Properties](https://github.com/tc39/proposal-class-public-fields) (stage 2 proposal).
* [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) and [Flow](https://flowtype.org/) syntax.

Learn more about [different proposal stages](https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-).

While we recommend to use experimental proposals with some caution, Facebook heavily uses these features in the product code, so we intend to provide [codemods](https://medium.com/@cpojer/effective-javascript-codemods-5a6686bb46fb) if any of these proposals change in the future.

Note that **the project only includes a few ES6 [polyfills](https://en.wikipedia.org/wiki/Polyfill)**:

* [`Object.assign()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) via [`object-assign`](https://github.com/sindresorhus/object-assign).
* [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) via [`promise`](https://github.com/then/promise).
* [`fetch()`](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) via [`whatwg-fetch`](https://github.com/github/fetch).

If you use any other ES6+ features that need **runtime support** (such as `Array.from()` or `Symbol`), make sure you are including the appropriate polyfills manually, or that the browsers you are targeting already support them.

