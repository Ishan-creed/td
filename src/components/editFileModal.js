import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeEditModal, setEditFileName, setOpenedFileIndex } from './Reducers/modalReducer';
import closeIcon from '../components/homepage/images/Close.png'; // Adjust the import path according to your project structure
import './homepage/homepage.css';

const EditFileModal = () => {
  const isOpen = useSelector((state) => state.editModalOpen); // Access editModalOpen from Redux store
  const openedFileIndex = useSelector((state) => state.openedFileIndex); // Get openedModuleIndex from Redux store
  const editFileName = useSelector((state) => state.editFileName); // Get editModuleName from Redux store
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState(editFileName); // Initialize state with editModuleName

  const handleClose = () => {
    dispatch(closeEditModal());
    setFileName(''); // Clear input field on modal close
  };

  const handleInputChange = (e) => {
    setFileName(e.target.value);
  };

  const handleEditFile = () => {
    if (fileName.trim() !== '') {
      // Get stored modules from localStorage
      const storedFiles = JSON.parse(localStorage.getItem('files')) || [];
      // Update the module name
      storedFiles[openedFileIndex] = fileName;
      // Save updated modules to localStorage
      localStorage.setItem('files', JSON.stringify(storedFiles));
      // Close modal
      dispatch(closeEditModal());
      // Clear input field on modal close
      setFileName('');
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
            value={fileName}
            onChange={handleInputChange}
          />
        </div>
        <div className='buttons'>
          <button className='cancel-button' onClick={handleClose}>
            <div>Cancel</div>
          </button>
          <button className='create-buttn' onClick={handleEditFile}>
            <div>Save Changes</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFileModal;
