import React from 'react';




const Cart = () => {
  // Sample data for cart items
  const cartItems = [
    { id: 1, name: "Coconut Oil", quantity: 2, price: 15.99 },
    { id: 2, name: "Banana Chips", quantity: 1, price: 5.99 },
    { id: 3, name: "Papaya Soap", quantity: 3, price: 7.49 },
  ];

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  // Inline styles for the component
  const styles = {
    cartContainer: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    cartTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
    },
    cartItemList: {
      listStyle: "none",
      padding: 0,
    },
    cartItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: "1px solid #eee",
    },
    itemName: {
      fontSize: "18px",
      flex: 2,
    },
    itemQuantity: {
      fontSize: "16px",
      flex: 1,
      textAlign: "center",
    },
    itemPrice: {
      fontSize: "16px",
      flex: 1,
      textAlign: "right",
    },
    totalPrice: {
      fontSize: "20px",
      fontWeight: "bold",
      marginTop: "20px",
      textAlign: "right",
    },
  };

  return (
    <div style={styles.cartContainer}>
      <h1 style={styles.cartTitle}>Shopping Cart</h1>
      <ul style={styles.cartItemList}>
        {cartItems.map(item => (
          <li key={item.id} style={styles.cartItem}>
            <span style={styles.itemName}>{item.name}</span>
            <span style={styles.itemQuantity}>Qty: {item.quantity}</span>
            <span style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</div>
    </div>
  );
};

export default Cart;
