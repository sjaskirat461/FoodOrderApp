import { useContext } from 'react';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import Modal from './UI/Modal';
import CartItem from './CartItem';

export default function Cart() {
  const cartCxt = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCxt.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }
  function handleCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === 'cart'}
      onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCxt.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCxt.addItem(item)}
            onDecrease={() => cartCxt.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>

        {cartCxt.items.length > 0 && (
          <Button onClick={handleCheckout}>Go To Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
