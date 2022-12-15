import { Fragment, useContext, useState } from 'react';

import CartContext from '../../store/cart-context';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartCheckout from './CartCheckout';

import classes from './Cart.module.css';

const Cart = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [ checkout, setCheckout ] = useState(false);
  const cartCtx = useContext(CartContext);

  const hasItem = (cartCtx.items.length > 0);

  const cartitems = cartCtx.items.map(item => {
    return (
      <CartItem
        key={item.id}
        data={item}
        onAdd={cartCtx.addItemToCart}
        onRemove={cartCtx.removeItemFromCart}
      />
    );
  })

  const Amount = `$${cartCtx.items.reduce((prevValue, curValue, idx, item) => {
    let val = item[idx].price * item[idx].amount;
    return prevValue + val;
  }, 0).toFixed(2)}`;

  const renderFormHandler = () => {
    setCheckout(true);
  }

  const submitData = async (UserData) => {
    setIsSubmitting(true);

    await fetch(
      "https://meals-database-d8db9-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: UserData,
          orderedItems: cartCtx.items,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const modalContent = (
    <Fragment>
      <ul className={classes["cart-items"]}>{cartitems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{Amount}</span>
      </div>
      {checkout && <CartCheckout onSendData={submitData} />}
      {!checkout && (
        <div className={classes.actions}>
          <button
            onClick={cartCtx.closeCart}
            className={classes["button--alt"]}
          >
            Close
          </button>
          {hasItem && (
            <button className={classes.button} onClick={renderFormHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Fragment>
  );

  return (
    <Modal>
      {isSubmitting && !didSubmit ? <p>Submitting Order</p> : <></>}
      {!isSubmitting && didSubmit ? (
        <Fragment>
          <p>Successfully sent order!</p>
          <div className={classes.actions}>
            <button
              onClick={cartCtx.closeCart}
              className={classes.button}
            >
              Close
            </button>
          </div>
        </Fragment>
      ) : (
        <></>
      )}
      {!isSubmitting && !didSubmit ? modalContent : <></>}
    </Modal>
  );
}

export default Cart;