import { useState, useEffect } from "react";
import axios from "axios";

const BookingList = () => {
  const URL = "http://localhost:8080/Checkout/";

  const [orders, setOrders] = useState([]);

  function fetchOrders() {
    axios.get(URL)
      .then((response) => {
        if (response.status === 200) {
          const fetchedOrders = response.data.Order;
          if (fetchedOrders && fetchedOrders.length > 0) {
            setOrders(fetchedOrders);
            console.log(fetchedOrders);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Booking List</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No completed orders yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-2">Booking ID</th>
                <th className="p-2">Product</th>
                <th className="p-2">Size</th>
                <th className="p-2">Start Date</th> {/* Added Start Date Column */}
                <th className="p-2">Return Date</th>
                <th className="p-2">Per Day Price</th>
                <th className="p-2">Total Amount</th>
                <th className="p-2">Booking Confirm</th>
                <th className="p-2">Booking Status</th>
                <th className="p-2">Payment Status</th>
                <th className="p-2">Booking Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, orderIndex) =>
                order.products.map((product, productIndex) => (
                  <tr key={`${orderIndex}-${productIndex}`} className="border-t text-center">
                    <td className="p-2">{order._id}</td>
                    <td className="p-2 text-blue-600 underline cursor-pointer">
                      {product.title}
                    </td>
                    <td className="p-2">{product.size || "N/A"}</td>
                    <td className="p-2">{order.startDate || "N/A"}</td> {/* Display Start Date */}
                    <td className="p-2">{order.returnDate || "N/A"}</td>
                    <td className="p-2">₹{product.price}</td>
                    <td className="p-2">₹{order.totalAmount}</td>
                    <td className="p-2">{order.confirm || "Yes"}</td>
                    <td className="p-2">{order.status || "Confirmed"}</td>
                    <td className="p-2 text-green-500">{order.payment}</td>
                    <td className="p-2">{order.bookingDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingList;
