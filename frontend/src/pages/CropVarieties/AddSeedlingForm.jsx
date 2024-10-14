import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddSeedlingForm = () => {
  const [seedlingType, setSeedlingType] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [disableFields, setDisabledFields] = useState({
    seedlingtype: false,
    currentStock: true,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSeedling = {
      seedlingType,
      currentQuantity: parseInt(currentQuantity), // Ensure quantity is a number
      minStock: 50, // Fixed value of 50 for minStock
    };

    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this seedling?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.post("http://localhost:5000/api/seedlings", newSeedling);
        setSuccessMessage("Seedling added successfully!");
        setSeedlingType("");
        setCurrentQuantity("");
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Error adding seedling: " + error.response?.data.message);
        setSuccessMessage("");
      }
    }
  };

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel adding this seedling?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, go back",
    });

    if (result.isConfirmed) {
      navigate(-1); // Navigates back to the previous page
    }
  };

  const handleSeedlingTypeChange = (e) => {
    const value = e.target.value;
    // Allow only letters and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setSeedlingType(value);
      setDisabledFields({
        ...disableFields,
        currentStock: false,
      });
    }
    // } else {
    //   setDisabledFields({
    //     ...disableFields,
    //     currentStock: true,
    //   })    }
  };

  return (
    <div>
      <style>{`
        .form-container {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .form-container h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          color: #555;
        }
        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .form-group input:focus {
          border-color: #4caf50;
          outline: none;
        }
        .button {
          width: 100%;
          padding: 10px;
          background-color: #4caf50;
          border: none;
          border-radius: 4px;
          color: white;
          font-size: 16px;
          cursor: pointer;
          margin-bottom: 10px;
        }
        .button:hover {
          background-color: #45a049;
        }
        .cancel-button {
          width: 100%;
          padding: 10px;
          background-color: #f44336;
          border: none;
          border-radius: 4px;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }
        .cancel-button:hover {
          background-color: #e53935;
        }
        .message {
          text-align: center;
          margin-top: 10px;
        }
        .message.error {
          color: red;
        }
        .message.success {
          color: green;
        }
        .minStock {
          font-size: 16px;
          color: #333;
          padding: 10px 0;
        }
      `}</style>

      <div className="form-container">
        <h2>Add New Seedling Type</h2>
        {errorMessage && <p className="message error">{errorMessage}</p>}
        {successMessage && <p className="message success">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="seedlingType">Seedling Type</label>
            <input
              type="text"
              id="seedlingType"
              value={seedlingType}
              onChange={handleSeedlingTypeChange}
              disabled={disableFields.seedlingtype}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="currentQuantity">Current Quantity</label>
            <input
              type="number"
              id="currentQuantity"
              value={currentQuantity}
              onChange={(e) => setCurrentQuantity(e.target.value)}
              disabled={disableFields.currentStock}
              required
            />
          </div>
          <div className="form-group">
            <label>Minimum Stock</label>
            <p className="minStock">50</p>{" "}
            {/* Display the fixed minimum stock value */}
          </div>
          <button type="submit" className="button">
            Add Seedling
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSeedlingForm;
