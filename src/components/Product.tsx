/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import "../css/Product.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/ProductSlice";
import { addItem, removeItem } from "../redux/slice";

const Product = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const productList = useSelector((state: any) => state.products.items);
  const cartList = useSelector((state: any) => state.cart.items);

  if (!productList?.length) return null;

  return (
    <div className="grid">
      {/* Image Section */}
      {productList.length &&
        productList.map((product) => (
          <div className="card" key={product.images[0]}>
            <img src={product.images[0]} alt="thumb" />

            <div className="content">
              <div className="title">{product.title}</div>
              <div className="brand">{product.brand}</div>
              <div className="price">{product.price}</div>
              <div className="rating">{product.rating}</div>
              {cartList.find((item: any) => item.id === product.id) ? (
                <button
                  className="btn btn-danger"
                  onClick={() => dispatch(removeItem(product))}
                >
                  Remove from cart
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={() => dispatch(addItem(product))}
                >
                  Add to cart
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
export default Product;
