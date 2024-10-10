import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../Reducers/orderReducer';
import Loader from './Loading';
import ErrorPage from './ErrorPage';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <Loader/>;
  if (error) return <ErrorPage/>;

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border rounded shadow cursor-pointer"
              onClick={() => handleOrderClick(order._id)}
            >
              <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Status: {order.orderStatus}</p>
              <p>Total: ${order.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
