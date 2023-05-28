import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import "./OrderHistory.css";
import { AuthContext } from "../context/Auth/AuthContext";

export const OrderHistory = () => {
  const { dataState } = useContext(DataContext);
  const { authState } = useContext(AuthContext);

  const orderHistoryArr =
    dataState?.orderHistory &&
    authState?.userDetails &&
    dataState?.orderHistory?.filter(
      ({ user }) => user === authState?.userDetails?.email
    );

  const addressPlaceholder = {
    letterSpacing: "2px",
    marginRight: "5px",
    fontSize: "1.1rem",
  };
  if (orderHistoryArr.length === 0) {
    return <h2>No orders to display</h2>;
  } else {
    return (
      <div className="order-history-container">
        <ol style={{ padding: "0" }}>
          {orderHistoryArr &&
            orderHistoryArr.map(
              ({
                address,
                amount,
                id,
                order,
                orderDate,
                orderTime,
                paymentId,
              }) => {
                return (
                  <li className="order-history" key={id}>
                    <p>
                      <span className="order-placeholder">Order ID</span>
                      {id}
                    </p>
                    <p>
                      <span className="order-placeholder">Order Date</span>
                      {orderDate}
                    </p>
                    <p>
                      <span className="order-placeholder">Order Time</span>
                      {orderTime}
                    </p>
                    <h2 className="order-heading">Ordered Items</h2>
                    <div className="order-history-order-layout">
                      {order &&
                        order?.map(({ id, title, qty, thumbnail }) => {
                          return (
                            <div className="orderhistory-order" key={id}>
                              <img src={thumbnail} width="130px" alt={title} />
                              <span className="product-order-content">
                                {title} X {qty}
                              </span>
                            </div>
                          );
                        })}
                    </div>

                    <h2 className="order-heading">Delivered Address</h2>
                    <div>
                      <h2 style={{ fontSize: "1.3rem" }}>{address.userName}</h2>
                      <p>
                        <span style={addressPlaceholder}>House Number:</span>{" "}
                        {address?.houseNumber}{" "}
                        <span style={addressPlaceholder}>Area:</span>{" "}
                        {address.area}
                      </p>
                      <p>
                        <span style={addressPlaceholder}>City:</span>{" "}
                        {address.city}
                      </p>
                      <p>
                        <span style={addressPlaceholder}>Pincode:</span>{" "}
                        {address?.pincode}{" "}
                        <span style={addressPlaceholder}>Ph No.</span>{" "}
                        {address.mobileNumber}
                      </p>
                    </div>
                  </li>
                );
              }
            )}
        </ol>
      </div>
    );
  }
};
