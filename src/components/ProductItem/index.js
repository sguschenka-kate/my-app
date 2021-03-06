import "./style.scss";

function ProductItem({ product, children, className, handleRoute }) {

  const handleClick = ({ target }) => {
    if (target.tagName !== 'BUTTON') {
      handleRoute(`/delivery-app/product/${product.id}`);
    } else {
      return
    }
  }

  return (
    <li
      className={`product-item ${className}`}
      onClick={handleClick}
    >
      <div className="product-item__image-wrapper">
        <img src={product.img} className="product-item__image" alt={product.name} />
      </div>
      <div className="product-item__container">
        <h3 className="product__name">
          {product.name}
        </h3>
        <div className="product-item__info">
          <div className="product-item__meta">
            <span className="product-item__meta-time">{product.time} min</span>
            <span className="product-item__meta-rank">
              <img src="/delivery-app/img/star.svg" alt="Star" className="product-item__meta-rank-image" aria-hidden="true" />
              {product.rate}
            </span>
            <div className="product-item__price">&#36; {product.price}</div>
          </div>
          {children}
        </div>
      </div>
    </li>
  )
}

export {
  ProductItem
}