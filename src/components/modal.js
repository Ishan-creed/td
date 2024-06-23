import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from './Reducers/modalReducer';
import closeIcon from '../components/homepage/images/Close.png'; // Adjust the import path according to your project structure
import './homepage/homepage.css';

const Modal = () => {
  const isOpen = useSelector((state) => state.modalOpen); // Access modalOpen from Redux store
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = useState('');

  const handleClose = () => {
    dispatch(closeModal());
    setModuleName(''); // Clear input field on modal close
  };

  const handleInputChange = (e) => {
    setModuleName(e.target.value);
  };

  const handleCreateModule = () => {
    if (moduleName.trim() !== '') {
      // Save module name to localStorage
      const storedModules = JSON.parse(localStorage.getItem('modules')) || [];
      const updatedModules = [...storedModules, moduleName];
      localStorage.setItem('modules', JSON.stringify(updatedModules));
      // Close modal
      dispatch(closeModal());
      // Clear input field
      setModuleName('');
      // Reload page if needed
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='modal-title'>
          <h3>Create New Module</h3>
          <img onClick={handleClose} className='close' src={closeIcon} alt="Close Icon" />
        </div>
        <p style={{ color: "grey" }}><b>Module name</b></p>
        <div className='input-module'>
          <input 
            placeholder='Enter the module name' 
            value={moduleName}
            onChange={handleInputChange}
          />
        </div>
        <div className='buttons'>
          <button className='cancel-button' onClick={handleClose}>
            <div>Cancel</div>
          </button>
          <button className='create-buttn' onClick={handleCreateModule}>
            <div>Create</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
