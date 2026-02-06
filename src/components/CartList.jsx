import { useSelector } from "react-redux";
import { createOrder, removeItem, updateItemPrice } from "../redux/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartList = () => {
  const CartList = useSelector((state) => state.cart.items);
  console.log(CartList);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleItemQuantity = (e, itemId) => {
    const quantity = parseInt(e.target.value);
    if (quantity < 0) return;
    console.log(quantity);
    const item = CartList.find((item) => item.id === itemId);
    console.log(item);
    dispatch(updateItemPrice({ id: itemId, quantity }));
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your cart items</h2>
        <span>{CartList.length} items</span>
      </div>
      {CartList.length ? (
        CartList.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <img
                src={item.images[0]}
                alt={item.title}
                style={{ width: "75px", height: "75px" }}
              />
              <div className="item-details">
                <h4>{item.title}</h4>
                <p>{item.brand}</p>
              </div>
            </div>
            <div className="item-actions">
              <div style={{ display: "flex" }}>
                <input
                  type="number"
                  style={{
                    width: "45px",
                    height: "24px",
                    margin: "38px 15px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  name="quantity"
                  id={`quantity-${item.id}`}
                  defaultValue={item.quantity || 1}
                  min={1}
                  max={4}
                  onChange={(e) => handleItemQuantity(e, item.id)}
                />
                <div>
                  <span className="price">
                    ${item.totalPrice || item.price}
                  </span>
                  <button
                    className="btn"
                    onClick={() => dispatch(removeItem(item))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}

      <div className="cart-footer">
        <button
          className="btn"
          onClick={() => {
            alert("Order placed successfully!");
            dispatch(createOrder());
            navigate("/");
          }}
        >
          Place order
        </button>
        Total : $
        {CartList.reduce(
          (total, item) => total + (item.totalPrice ?? item.price),
          0,
        ).toFixed(2)}
      </div>
    </div>
  );
};

export default CartList;
