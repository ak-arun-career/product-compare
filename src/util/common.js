/**
 * @method productCountIndicator
 * @summary A util method to fetch the update on the number of products selected for comparison
 * @returns {Integer} productCompareCounter - the total number or products selected
 */
export const productCountIndicator = (props) => {
    let productComparecounter = 0;

    props.forEach(product => {
      if(product.Display === true) {
        productComparecounter += 1;
      }
    })
    return productComparecounter;
  };