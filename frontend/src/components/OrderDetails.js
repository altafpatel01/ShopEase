import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails,deleteOrder} from '../Reducers/orderDetailReducer';
import Loader from './Loading';
import ErrorPage from './ErrorPage';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orderDetaile);

  useEffect(() => {
    dispatch(fetchOrderDetails(orderId));
  }, [dispatch, orderId]);

  const handleDelete = () => {
    dispatch(deleteOrder(orderId))
      .then(() => {
        toast.success('Order deleted successfully')
        Swal.fire({
            title: "The order is cancle?",
            text: "refund will be inisiated in 7 working days",
            icon: "success",
            // showCancelButton: true,
            confirmButtonText: "ok",
            // cancelButtonText: "No, keep it",
            confirmButtonColor: "#green",
            // cancelButtonColor: "#3085d6",
            background: "#fefefe",
            // timer: 5000,
            // timerProgressBar: true,
            customClass: {
              popup: "my-custom-popup",
            },
          });;
        navigate('/orders'); // Redirect back to the orders list after deletion
      })
      .catch((err) => toast.error('Failed to delete order',err));
  };

  if (loading) return <div><Loader/></div>;
  if (error) return <div><ErrorPage/></div>;
  if (!order) return <div>Order not found.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
      <div className="p-4 border rounded shadow">
        <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        <p>Status: <span className="font-bold">{order.orderStatus}</span></p>
        <p>Total: <span className="font-bold">${order.totalPrice}</span></p>

        <h4 className="text-lg font-semibold mt-4">Items:</h4>
        <ul className="list-disc pl-5">
          {order.orderItems.map((item) => (
            <li key={item._id} className="mt-4 flex items-start gap-4">
              <img src={item.image.url} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price} each</p>
                <p>Total: ${item.quantity * item.price}</p>
              </div>
            </li>
          ))}
        </ul>

        <h4 className="text-lg font-semibold mt-4">Shipping Address:</h4>
        <p>{order.shippingInfo.address}</p>
        <p>{order.shippingInfo.city}, {order.shippingInfo.state}</p>
        <p>{order.shippingInfo.country} - {order.shippingInfo.pinCode}</p>
        <p>Phone: {order.shippingInfo.phoneNumber}</p>

        <h4 className="text-lg font-semibold mt-4">Payment Info:</h4>
        <p>Payment ID: {order.paymentInfo.id}</p>
        <p>Status: <span className="font-bold">{order.paymentInfo.status}</span></p>
        <p>Paid At: {new Date(order.paidAt).toLocaleDateString()}</p>

        <button
          className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
