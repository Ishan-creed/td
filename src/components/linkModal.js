import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from './Reducers/modalReducer';
import closeIcon from '../components/homepage/images/Close.png';

const LinkModal = () => {
    const dispatch = useDispatch();
    const [linkName, setLinkName] = useState('');
    const [linkUrl, setLinkUrl] = useState('');

    const handleClose = () => {
        dispatch(closeModal());
        setLinkName('');
        setLinkUrl('');
    };

    const handleNameChange = (e) => {
        setLinkName(e.target.value);
    };

    const handleUrlChange = (e) => {
        setLinkUrl(e.target.value);
    };

    const handleSave = () => {
        if (linkName.trim() !== '' && linkUrl.trim() !== '') {
            // Save link to localStorage
            const storedLinks = JSON.parse(localStorage.getItem('links')) || [];
            const updatedLinks = [...storedLinks, { name: linkName, url: linkUrl }];
            localStorage.setItem('links', JSON.stringify(updatedLinks));

            // Close modal
            dispatch(closeModal());
            // Clear input fields
            setLinkName('');
            setLinkUrl('');
            window.location.reload();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className='modal-title'>
                    <h3>Add a Link</h3>
                    <img onClick={handleClose} className='close' src={closeIcon} alt="Close Icon" />
                </div>
                 <div>
                    <label htmlFor="linkUrl">Link URL:</label>
                    <div className='input-module'>
                        <input
                            type="text"
                            id="linkUrl"
                            value={linkUrl}
                            onChange={handleUrlChange}
                            placeholder="URL"
                        /></div>
                </div>
                <div style={{marginTop:"20px"}} >
                    <label htmlFor="linkName">Link Name:</label>
                    <div className='input-module'>
                        <input
                            type="text"
                            id="linkName"
                            value={linkName}
                            onChange={handleNameChange}
                            placeholder="Display name"
                        /></div>
                </div>

                <div className='buttons'>
                    <button onClick={handleClose} className='cancel-button'>
                        Cancel
                    </button>
                    <button onClick={handleSave} className='create-buttn'>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LinkModal;
