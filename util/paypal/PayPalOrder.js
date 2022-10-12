import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import PaypalButton from "./PayPalButton";


const PaypalOrder = ({amount, onApproveHandler}) => {
  const style = { "layout": "vertical" };
  const options ={
                  "client-id": "AWTgxoZ5cXVY_KQoZ-xwI6sptyVxclsrgy2rvqHiPMK_ZOBc_yfyH5LfWWLJcwCRh9pBIa8-FOgTm5R9",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card"
                };

  const createOrderHandler = (data, actions) => {
    // Set up the transaction
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount
          }
        }
      ]
    });
  };


  return (
    <>
      <PayPalScriptProvider options={options}>
        <PaypalButton fundingSource={undefined}
          style={style}
          createOrder={createOrderHandler}
          onApprove={onApproveHandler}
        />
      </PayPalScriptProvider>
    </>
  );
};

export default PaypalOrder;