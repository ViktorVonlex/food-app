import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";
import { Modal, Button, Group } from '@mantine/core';
import PaypalOrder from "../util/paypal/PayPalOrder";

const Cart = (props) => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const amount = cart.total;
  const currency = "USD";
  const style = { "layout": "vertical" };

  const host = props.host

  const createOrder = async (data) => {
    console.log(data)
    
    try {
      const res = await axios.post(`${host}/api/orders`, data);
      if (res.status === 201) {
        router.push(`/orders/${res.data._id}`);
        dispatch(reset());
      }
    } catch (error) {
      console.log(error)
    }
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
              <PaypalOrder amount={amount} onApproveHandler={(data, actions) => {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function (details) {
                  // This function shows a transaction success message to your buyer.
                  const shipping = details.purchase_units[0].shipping;
                  createOrder({ customer: shipping.name.full_name, address: shipping.address.address_line_1, total: cart.total, method: 1 })
                  alert("Transaction completed by " + details.payer.name.given_name);
                });
              }}/>
            </div>
        </div>
      </div>

    </div>
  );
};



export default Cart;

export async function getStaticProps() {
  const host = process.env.HOST

  return { props: { host } }
}