import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateItemQuantity, clearCart } from "../Reducers/cartReducer";

function Cart() {
  const dispatch = useDispatch();
  
  // Get the cart items, total price, and total quantity from the Redux store
  const { items, totalPrice, totalQuantity } = useSelector((state) => state.cart);

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateItemQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      
      {items.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="hidden lg:block">
            {/* Desktop Table View */}
            <table className="w-full text-left mb-8 border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 py-4">Product</th>
                  <th className="border-b-2 py-4">Quantity</th>
                  <th className="border-b-2 py-4">Price</th>
                  <th className="border-b-2 py-4">Total</th>
                  <th className="border-b-2 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="py-4">{item.name}</td>
                    <td className="py-4">
                    <div className="flex items-center mt-4 space-x-4">
  <button
    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full shadow transition duration-300 ease-in-out"
  >
    -
  </button>
  <span className="text-lg font-semibold">{item.quantity}</span>
  <button
    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full shadow transition duration-300 ease-in-out"
  >
    +
  </button>
</div>

                    </td>
                    <td className="py-4">&#8377; {item.price}</td>
                    <td className="py-4">&#8377; {item.price * item.quantity}</td>
                    <td className="py-4">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden">
            {items.map((item) => (
              <div key={item.id} className="border-b mb-4 pb-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-700">&#8377; {item.price}</p>
                  <p className="text-gray-700">
                    Total: &#8377; {item.price * item.quantity}
                  </p>
                </div>
                <div className="flex items-center mt-4 space-x-4">
  <button
    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full shadow transition duration-300 ease-in-out"
  >
    -
  </button>
  <span className="text-lg font-semibold">{item.quantity}</span>
  <button
    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full shadow transition duration-300 ease-in-out"
  >
    +
  </button>
</div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-4 mt-6">
            <button
              onClick={handleClearCart}
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
            >
              Clear Cart
            </button>
            <div>
              <p className="text-lg">
                Total Items: <strong>{totalQuantity}</strong>
              </p>
              <p className="text-lg">
                Total Price: <strong>&#8377; {totalPrice}</strong>
              </p>
            </div>
          </div>
          
          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
