import React from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { encodedData } = useParams();
  let detailObj = {};

  try {
    // Decode the data
    const decodedData = decodeURIComponent(encodedData);
    console.log("Decoded Data:", decodedData); // Debug log

    // Split the data to display it properly
    const details = decodedData.split(', ');
    console.log("Details Array:", details); // Debug log

    // Populate the detailObj from the details array
    details.forEach(detail => {
      const [key, ...value] = detail.split(': ');
      if (key && value.length > 0) { // Check if key and value are present
        detailObj[key.trim()] = value.join(': ').trim(); // Join back if value contains ': '
      } else {
        console.warn("Invalid detail format:", detail); // Log warnings for invalid formats
      }
    });

    console.log("Detail Object:", detailObj); // Debug log
  } catch (error) {
    console.error("Error decoding data: ", error);
    return <div style={styles.error}>Error decoding data. Please check the URL.</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Product Details</h2>
      {Object.keys(detailObj).length > 0 ? (
        <p style={styles.detail}>
          <strong>Product:</strong> {detailObj['Product'] || 'N/A'}
        </p>
      ) : (
        <p>No product details available. Please check the input.</p>
      )}
    </div>
  );
};

// Optional: Basic styling
const styles = {
  container: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    maxWidth: '600px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#1D6660',
  },
  detail: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: '20px 0',
  },
};

export default DetailsPage;
