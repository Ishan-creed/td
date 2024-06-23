import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeEditModal, setEditModuleName, setOpenedModuleIndex } from './Reducers/modalReducer';
import closeIcon from '../components/homepage/images/Close.png'; // Adjust the import path according to your project structure
import './homepage/homepage.css';

const EditModal = () => {
  const isOpen = useSelector((state) => state.editModalOpen); // Access editModalOpen from Redux store
  const openedModuleIndex = useSelector((state) => state.openedModuleIndex); // Get openedModuleIndex from Redux store
  const editModuleName = useSelector((state) => state.editModuleName); // Get editModuleName from Redux store
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = useState(editModuleName); // Initialize state with editModuleName

  const handleClose = () => {
    dispatch(closeEditModal());
    setModuleName(''); // Clear input field on modal close
  };

  const handleInputChange = (e) => {
    setModuleName(e.target.value);
  };

  const handleEditModule = () => {
    if (moduleName.trim() !== '') {
      // Get stored modules from localStorage
      const storedModules = JSON.parse(localStorage.getItem('modules')) || [];
      // Update the module name
      storedModules[openedModuleIndex] = moduleName;
      // Save updated modules to localStorage
      localStorage.setItem('modules', JSON.stringify(storedModules));
      // Close modal
      dispatch(closeEditModal());
      // Clear input field on modal close
      setModuleName('');
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='modal-title'>
          <h3>Edit Name</h3>
          <img onClick={handleClose} className='close' src={closeIcon} alt="Close Icon" />
        </div>
        <div className='input-module'>
          <input 
            placeholder='Enter the new name' 
            value={moduleName}
            onChange={handleInputChange}
          />
        </div>
        <div className='buttons'>
          <button className='cancel-button' onClick={handleClose}>
            <div>Cancel</div>
          </button>
          <button className='create-buttn' onClick={handleEditModule}>
            <div>Save Changes</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
