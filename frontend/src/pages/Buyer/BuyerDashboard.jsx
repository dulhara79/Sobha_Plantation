import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const BuyerDashboard = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  // Internal CSS styling
  const styles = {
    dashboardContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr', // 2 items per row
      gap: '40px',
      justifyContent: 'center',
      margin: '20px',
    },
    card: {
      backgroundColor: '#a3f5a1',
      width: '300px',
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'background-color 0.3s ease, transform 0.3s ease', // Added transition for smooth animation
    },
    cardHover: {
      backgroundColor: '#00e600',
      transform: 'scale(1.1)', // Slightly enlarge the component
    },
    icon: {
      fontSize: '64px',
      marginBottom: '10px',
    },
  };

  return (
    <div>
      <Header />
      <Sidebar />
      
      <div className={`ml-[300px] pt-3`}>
        <div style={styles.dashboardContainer}>
          <div
            style={styles.card}
            onClick={() => navigateTo('/buyerinfotable')}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = styles.cardHover.backgroundColor;
              e.currentTarget.style.transform = styles.cardHover.transform; // Apply scale effect
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = styles.card.backgroundColor;
              e.currentTarget.style.transform = 'scale(1)'; // Reset scale when the mouse is out
            }}
          >
            <div style={styles.icon}>👤</div>
            <h3>Manage Buyer Details</h3>
          </div>

          <div
            style={styles.card}
            onClick={() => navigateTo('/Bdeliverytable')}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = styles.cardHover.backgroundColor;
              e.currentTarget.style.transform = styles.cardHover.transform;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = styles.card.backgroundColor;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div style={styles.icon}>🚚</div>
            <h3>Manage Delivery Information</h3>
          </div>

          <div
            style={styles.card}
            onClick={() => navigateTo('/manage-orders')}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = styles.cardHover.backgroundColor;
              e.currentTarget.style.transform = styles.cardHover.transform;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = styles.card.backgroundColor;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div style={styles.icon}>📦</div>
            <h3>Manage Orders</h3>
          </div>

          <div
            style={styles.card}
            onClick={() => navigateTo('/manage-feedback')}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = styles.cardHover.backgroundColor;
              e.currentTarget.style.transform = styles.cardHover.transform;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = styles.card.backgroundColor;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div style={styles.icon}>📝</div>
            <h3>Manage Feedback</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
