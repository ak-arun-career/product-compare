const Badge = (props) => (
    <img
        src={props.src}
        alt={props.alt}
        onError={props.onImageLoadingError}
    />
);
    
export default Badge;