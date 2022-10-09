import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";
import { Modal, Button, Group } from '@mantine/core';

const Cart = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const amount = cart.total;
  const currency = "USD";
  const style = { "layout": "vertical" };

  const createOrder = async (data) => {
    console.log(data)
    try {
      const res = await axios.post(`${process.env.HOST}/api/orders`, data);
      if (res.status === 201) {
        router.push(`/orders/${res.data._id}`);
        dispatch(reset());
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);


    return (<>

      <PayPalButtons
        style={style}
        disabled={false}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (details) {
            // Your code here after capture the order
            const shipping = details.purchase_units[0].shipping;
            createOrder({ customer: shipping.name.full_name, address: shipping.address.address_line_1, total: cart.total, method: 1 })
          });
        }}
      />
    </>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map(product => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => {
                      <span key={extra._id}>{extra.text} </span>
                    })}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>${product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>${product.price * product.quantity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
            <div className={styles.paymentMethods}>
              <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={`You will pay $${cart.total} after delivery.`}
                centered
              >
                
                <OrderDetail total={cart.total} createOrder={createOrder} />
                
              </Modal>

              <Group position="center">
                <Button styles={(theme) => ({
                  root: {
                    '&:hover': {
                      backgroundColor: theme.fn.darken('#fafafa', 0.05),
                    }
                  }
                })}
                  fullWidth className={styles.payButton} onClick={() => { setOpened(true) }}>CASH ON DELIVERY</Button>
              </Group>  
                <ButtonWrapper
                  currency={currency}
                  showSpinner={false}
                />
            </div>
        </div>
      </div>

    </div>
  );
};



export default Cart;