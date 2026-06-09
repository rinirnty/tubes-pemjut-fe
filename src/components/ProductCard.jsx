const ProductCard = ({ product }) => {
  return (
    <div className="prod-card">
      <div
        className="prod-thumb"
        style={{ background: product.bg || "#FFF8E8" }}
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
        ) : (
          <span>{product.emoji}</span>
        )}

        {product.badge && (
          <span className={`prod-badge-abs badge-${product.badge}`}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="prod-body">
        <div className="prod-cat">{product.cat}</div>
        <div className="prod-name">{product.name}</div>
        <div className="prod-var">{product.var}</div>
        <div className="prod-mitra">🤝 {product.mitra}</div>
        <div className="prod-footer">
          <div>
            <div className="prod-price">{product.price}</div>
            <div className="prod-unit">{product.unit}</div>
          </div>
          <button className="prod-btn">+</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
