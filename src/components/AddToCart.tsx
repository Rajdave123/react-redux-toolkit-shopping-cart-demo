import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const AddToCart = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cartSelector = useSelector((state: any) => state.cart.items);
  console.log(cartSelector);

  return (
    <Link to="/cart">
      <div className="cart">
        <i className="fa-solid fa-cart-shopping"></i>
        <span className="cart-count">{cartSelector.length ?? 0}</span>
      </div>
    </Link>
  );
};

export default AddToCart;
