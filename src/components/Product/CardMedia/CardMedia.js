/**
 * @description This 'cardmedia' component is designed to display a preview image of a product.
 */

const cardMedia = (props) => (
    <div className={props.className}>
        <img
            src={props.src}
            alt={props.alt}
        />
    </div>
);

export default cardMedia;