import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CropVarietyForm = ({ cropVarietyId, onSuccess }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        assignedPerson: '',
        fieldName: '',
        varieties: '',
        plantationDate: '',
        status: 'Planned',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAssignedPersonDisabled, setIsAssignedPersonDisabled] = useState(true); // Initially disabled
    const [isFieldNameDisabled, setIsFieldNameDisabled] = useState(true); // Initially disabled
    const [isVarietiesDisabled, setIsVarietiesDisabled] = useState(true); // Initially disabled
    const [isPlantationDateDisabled, setIsPlantationDateDisabled] = useState(true); // Initially disabled
    const [isStatusDisabled, setIsStatusDisabled] = useState(true); // Initially disabled

    const cropVarietyOptions = [
        'Coconut',
        'Papaya',
        'Pineapple',
        'Banana',
    ];

    const fieldNameOptions = [
        'Field A',
        'Field B',
        'Field C',
        'Field D',
    ];

    useEffect(() => {
        if (cropVarietyId) {
            setLoading(true);
            axios.get(`http://localhost:5000/api/crop-varieties/${cropVarietyId}`)
                .then((response) => {
                    setFormData(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError('Failed to load crop variety data');
                    setLoading(false);
                });
        }
    }, [cropVarietyId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle ID change
        if (name === 'id') {
            setFormData({
                ...formData,
                [name]: value,
            });
        }

        // Handle Assigned Person change
        if (name === 'assignedPerson') {
            const validValue = value.replace(/[^a-zA-Z\s]/g, ''); // Allow only alphabetic characters and spaces
            setFormData({
                ...formData,
                [name]: validValue,
            });

            // Enable Field Name if Assigned Person is not empty
            setIsFieldNameDisabled(validValue.trim() === '');
        }

        // Handle Field Name change
        if (name === 'fieldName') {
            setFormData({
                ...formData,
                [name]: value,
            });
            // Enable Varieties dropdown if Field Name is selected
            setIsVarietiesDisabled(value.trim() === '');
        }

        // Handle Varieties change
        if (name === 'varieties') {
            setFormData({
                ...formData,
                [name]: value,
            });
            // Enable Plantation Date if Varieties is selected
            setIsPlantationDateDisabled(value.trim() === '');
        }

        // Handle Plantation Date change
        if (name === 'plantationDate') {
            setFormData({
                ...formData,
                [name]: value,
            });
            // Enable Status if Plantation Date is selected
            setIsStatusDisabled(value.trim() === '');
        }

        // Handle Status change
        if (name === 'status') {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const method = cropVarietyId ? 'put' : 'post';
        const url = cropVarietyId 
            ? `http://localhost:5000/api/crop-varieties/${cropVarietyId}` 
            : 'http://localhost:5000/api/crop-varieties';

        axios[method](url, formData)
            .then((response) => {
                setSuccess('Crop variety saved successfully!');
                onSuccess(response.data);
            })
            .catch((err) => {
                setError(err.response?.data?.error || 'An error occurred while saving the crop variety');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleReset = () => {
        setFormData({
            id: '',
            assignedPerson: '',
            fieldName: '',
            varieties: '',
            plantationDate: '',
            status: 'Planned',
        });
        setError('');
        setSuccess('');
        setIsFieldNameDisabled(true); // Reset to disabled
        setIsVarietiesDisabled(true); // Reset to disabled
        setIsPlantationDateDisabled(true); // Reset to disabled
        setIsStatusDisabled(true); // Reset to disabled
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const todayDate = new Date().toISOString().split('T')[0];

    return (
        <div style={styles.container}>
            <style>
                {`
                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                `}
            </style>
            <h2 style={styles.heading}>{cropVarietyId ? 'Update' : 'Create'} Crop Variety</h2>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label htmlFor="id">ID</label>
                    <input 
                        type="text" 
                        id="id" 
                        name="id" 
                        placeholder="Enter a unique ID"
                        value={formData.id} 
                        onChange={handleChange} 
                        required 
                        disabled={!!cropVarietyId} 
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="assignedPerson">Assigned Person</label>
                    <input 
                        type="text" 
                        id="assignedPerson" 
                        name="assignedPerson" 
                        placeholder="Enter the name of the assigned person"
                        value={formData.assignedPerson} 
                        onChange={handleChange} 
                        required 
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="fieldName">Field Name</label>
                    <select 
                        id="fieldName" 
                        name="fieldName" 
                        value={formData.fieldName} 
                        onChange={handleChange} 
                        required 
                        disabled={isFieldNameDisabled} // Disable until Assigned Person is typed
                        style={styles.input}
                    >
                        <option value="" disabled>Select a field</option>
                        {fieldNameOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="varieties">Varieties</label>
                    <select 
                        id="varieties" 
                        name="varieties" 
                        value={formData.varieties} 
                        onChange={handleChange} 
                        required 
                        disabled={isVarietiesDisabled} // Disable until Field Name is selected
                        style={styles.input}
                    >
                        <option value="" disabled>Select a variety</option>
                        {cropVarietyOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="plantationDate">Plantation Date</label>
                    <input 
                        type="date" 
                        id="plantationDate" 
                        name="plantationDate" 
                        value={formData.plantationDate} 
                        onChange={handleChange} 
                        required 
                        disabled={isPlantationDateDisabled} // Disable until Varieties is selected
                        min={todayDate}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="status">Status</label>
                    <select 
                        id="status" 
                        name="status" 
                        value={formData.status} 
                        onChange={handleChange} 
                        required 
                        disabled={isStatusDisabled} // Disable until Plantation Date is selected
                        style={styles.input}
                    >
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Saving...' : cropVarietyId ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={handleReset} disabled={loading} style={{ ...styles.button, ...styles.resetButton }}>
                    Reset
                </button>
                <button type="button" onClick={handleCancel} disabled={loading} style={{ ...styles.button, ...styles.cancelButton }}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '1.5em',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1em',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1em',
        marginTop: '10px',
    },
    resetButton: {
        backgroundColor: '#f44336',
        marginTop: '5px',
    },
    cancelButton: {
        backgroundColor: '#777',
        marginTop: '5px',
    },
    error: {
        color: 'red',
        marginBottom: '15px',
        fontSize: '0.9em',
        textAlign: 'center',
    },
    success: {
        color: 'green',
        marginBottom: '15px',
        fontSize: '0.9em',
        textAlign: 'center',
    },
};

export default CropVarietyForm;
