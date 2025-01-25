import React, { Fragment, useEffect, useRef, useState } from "react";
import HorizontalStepper from "./HorizontalStepper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createOrder } from "../Reducers/orderReducer";
import Swal from "sweetalert2";
import { clearCart } from "../Reducers/cartReducer";
import Loader from "./Loading";

function ConfirmOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pymbtn = useRef(null)
  const { info } = useSelector((state) => state.shipping);
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );
  const { error, loading } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.user);
  const SubTotal = totalPrice;
  const GST = (totalPrice * 18) / 100;
  const Delivery_chg = totalPrice > 1000 ? 80 : 0;
  const TotalPrice = totalPrice + Delivery_chg + GST;

  const proceedToPayment = () => {
    handlePayment();
    pymbtn.current.disable=true
  };
  const [totalAmount, setAmount] = useState();
  const [nnntotalAmount, setAmounts] = useState({});

  // const { info } = useSelector((state) => state.shipping);
  // const {userInfo}=useSelector((state)=> state.user)
  // const { items, totalPrice, totalQuantity } = useSelector(
  //     (state) => state.cart
  //   );

  const handlePayment = async () => {
    try {
      // Call backend to create an order
      const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/payment`,
         {
        amount: totalAmount,
        },
      { withCredentials: true });
      console.log(data);
      // Payment options
      const options = {
        key: "rzp_test_ABMgWcpTJjuDxP", // Replace with Razorpay Test Key ID
        amount: totalAmount, // Amount in paise
        currency: "INR",
        name: "ShopEase",
        description: "Test Transaction",
        order_id: data.id, // Pass the order ID from backend
        handler: function (response) {
          // Handle payment success
          console.log(response);
          dispatch(
            createOrder({
              shippingInfo: {
                address: info.address,
                city: info.city,
                state: info.state,
                country: info.country,
                pinCode: info.pinCode,
                phoneNumber: info.phoneNo,
              },
              orderItems: items,
              paymentInfo: {
                razorpay_order_id: "order_P712sy6LCd8u9D",
                status: "success",
                id: response.razorpay_payment_id,
              },
              itemsPrice: totalPrice,
              taxPrice: nnntotalAmount.GST,
              shippingPrice: nnntotalAmount.Delivery_chg,
              totalPrice: totalAmount,
            })
          );
          if (!error) {
            dispatch(clearCart());
            Swal.fire({
              title: "Order Placed successfully?",
              text: "soon you order will be delivered",
              // icon: "warning",
              // showCancelButton: true,
              confirmButtonText: "OK",
              // cancelButtonText: "No, keep it",
              confirmButtonColor: "#d33",
              // cancelButtonColor: "#3085d6",
              background: "#fefefe",
              // timer: 5000,
              // timerProgressBar: true,
              customClass: {
                popup: "my-custom-popup",
              },
            }).then(() => {
              navigate("/orders");
            });
          } else {
            Swal.fire({
              title: "The order is not placed?",
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
            });
          }
        },

        prefill: {
          name: userInfo.name, // Prefill data
          email: userInfo.email,
          contact: info.phoneNo,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment failed:", error);
      Swal.fire({
        title: "Payment is Failed?",
        text: "if any amount is detected will be refund in 7 working days",
        icon: "warning",
        // showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        // cancelButtonText: "No, keep it",
        confirmButtonColor: "#d33",
        // cancelButtonColor: "#3085d6",
        background: "#fefefe",
        // timer: 5000,
        // timerProgressBar: true,
        customClass: {
          popup: "my-custom-popup",
        },
      });
    }
  };
  useEffect(() => {
    if (userInfo._id) {
      const data = {
        SubTotal,
        GST,
        Delivery_chg,
        TotalPrice,
      };
      sessionStorage.setItem(`${userInfo._id}_orderInfo`, JSON.stringify(data));
      const ntotalAmount = sessionStorage.getItem(`${userInfo._id}_orderInfo`);
      const nntotalAmount = JSON.parse(ntotalAmount);
      console.log(nntotalAmount);
      setAmounts(nntotalAmount);
      setAmount(nntotalAmount.TotalPrice);
    }
  }, [userInfo._id, setAmount, SubTotal, GST, Delivery_chg, TotalPrice]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : items.length>0?(
        <>
          <div>
            <div className="mt-10">
              <HorizontalStepper step={1} />
            </div>
            <div className=" max-w-6xl mobile:w-full gap-5 mx-auto mobile:flex mobile:flex-col mobile:items-center my-16 flex ">
              <div className=" w-4/5 mobile:w-full border-r-2 px-3">
                <div className="flex flex-col gap-2 ">
                  <div className="border-b-2 pb-2">
                    <h1 className="text-3xl">Shipping Info :</h1>
                    <div>
                      <div>Name : {userInfo.name}</div>
                      <div>
                        Address : {info.address}, {info.city}, {info.state},{" "}
                        {info.country},{info.pinCode}{" "}
                      </div>
                      <div>Phone: {info.phoneNo}</div>
                    </div>
                  </div>
                  <div className="flex flex-col border-b-2 pb-4 gap-2 mt-4">
                    <h1 className="text-3xl mobile:mb-4 mobile:mt-4">
                      Your Cart Items :
                    </h1>
                    {items.map((item) => {
                      return (
                        <div className="flex justify-between items-center ">
                          <div className="flex items-center gap-2">
                            <img
                              className="w-12 h-12"
                              src={item.image.url}
                              alt="item"
                            />
                            <div>{item.name}</div>
                          </div>
                          <div>
                            {item.quantity}x&#8377;{item.price}=
                            {item.quantity * item.price}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className=" w-1/5  mobile:w-full">
                <div>
                  <h1 className="text-2xl mobile:text-center">Order Summery</h1>
                  <div className=" flex flex-col gap-2 mt-4 mobile:px-4">
                    <div className="flex justify-between border-b-2">
                      <p>SubTotal:</p> &#8377;{SubTotal}
                    </div>
                    <div className="flex justify-between border-b-2">
                      <p>Total Items:</p> {totalQuantity}
                    </div>
                    <div className="flex justify-between border-b-2">
                      <p>GST: &#8377;</p> {GST}
                    </div>
                    <div className="flex justify-between border-b-2">
                      <p>Delivery Chg :</p> &#8377;{Delivery_chg}{" "}
                    </div>
                    <div className="flex justify-between border-b-2">
                      <p>Total Price :</p> &#8377;{TotalPrice}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-center mb-10 ">
              <button ref={pymbtn}
                onClick={proceedToPayment}
                className="bg-soft-pastel-blue rounded-sm text-white transition-all duration-300 ease-in-out hover:text-black hover:bg-white px-3 py-1 max-w-44"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </>
      ):<p> </p>}
    </Fragment>
  );
}

export default ConfirmOrder;
