import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const styles = {
    cart: {
      marginTop: '100px',
    },
    cartItemTitle: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 0.5fr',
      alignItems: 'center',
      color: 'grey',
      fontSize: 'max(1vw, 12px)',
    },
    cartItem: {
      margin: '10px 0',
      color: 'black',
    },
    cartItemImage: {
      width: '50px',
    },
    hr: {
      height: '1px',
      backgroundColor: '#e2e2e2',
      border: 'none',
    },
    removeButton: {
      cursor: 'pointer',
    },
    cartBottom: {
      marginTop: '80px',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'max(12vw, 20px)',
    },
    cartTotal: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    cartTotalDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      color: '#555',
    },
    totalButton: {
      border: 'none',
      color: 'white',
      backgroundColor: 'tomato',
      width: 'max(15vw, 200px)',
      padding: '12px 0',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    
    promoCodeSection: {
      flex: 1,
    },
    promoCodeText: {
      color: '#555',
    },
    promoCodeInputContainer: {
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#eaeaea',
      borderRadius: '4px',
    },
    promoCodeInput: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      paddingLeft: '10px',
    },
    promoCodeButton: {
      width: 'max(10vw, 150px)',
      padding: '12px 5px',
      backgroundColor: 'black',
      border: 'none',
      color: 'white',
      borderRadius: '4px',
    },
  };

  return (
    <div style={styles.cart}>
      <div className="cart-items">
        <div style={styles.cartItemTitle}>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr style={styles.hr} />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div style={styles.cartItem}>
                  <img src={`${url}/images/${item.image}`} alt="" style={styles.cartItemImage} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} style={styles.removeButton}>x</p>
                </div>
                <hr style={styles.hr} />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div style={styles.cartBottom}>
        <div style={styles.cartTotal}>
          <h2>Cart Total</h2>
          <div>
            <div style={styles.cartTotalDetails}>
              <p>Sub total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr style={styles.hr} />
            <div style={styles.cartTotalDetails}>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr style={styles.hr} />
            <div style={styles.cartTotalDetails}>
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate('/placeOrder')} style={styles.totalButton}>PROCEED TO CHECKOUT</button>
        </div>
        <div style={styles.promoCodeSection}>
          <div>
            <p style={styles.promoCodeText}>If you have a promo code, enter it here</p>
            <div style={styles.promoCodeInputContainer}>
              <input type="text" placeholder='promo code' style={styles.promoCodeInput} />
              <button style={styles.promoCodeButton}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
