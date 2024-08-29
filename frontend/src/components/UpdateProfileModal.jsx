import React from 'react';

const UpdateProfileModal = ({ isOpen, onClose, profile, onUpdate }) => {
  if (!isOpen) return null;


  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '400px' }}>
        <h3>Update Profile</h3>
        {/* Form for updating profile information */}
        <form>
          {/* Add form fields for updating profile information */}
          <button onClick={onClose} style={{ padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}>Close</button>
        </form>
      </div>
    </div>
  );
};


export default UpdateProfileModal;
