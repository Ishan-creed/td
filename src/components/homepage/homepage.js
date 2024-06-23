import React, { useState, useEffect } from 'react';
import './homepage.css';
import centreImage from './images/Web.png';
import moduleIcon from './images/module.png';
import linkIcon from './images/link.png';
import uploadIcon from './images/download.png';
import addIcon from './images/+.png';
import Modal from '../modal';
import EditModal from '../editModal';
import LinkModal from '../linkModal'; // Assuming LinkModal is correctly imported
import { setLinks, openModal, openEditModal, openLinkModal, closeEditModal, setEditModuleName } from '../Reducers/modalReducer';
import { useSelector, useDispatch } from 'react-redux';
import burger from './images/burger.png';
import deleteIcon from './images/delete.png';
import editIcon from './images/edit.png';
import downloadIcon from './images/download.png';
import fileLogo from './images/fileLogo.png';
import linkLogo from './images/linkIcon.png';

const Homepage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modules, setModules] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openedModuleIndex, setOpenedModuleIndex] = useState(null);
  const [openedFileIndex, setOpenedFileIndex] = useState(null);
  const [openedLinkIndex, setOpenedLinkIndex] = useState(null);
  const editModalOpen = useSelector(state => state.editModalOpen);
  const editModuleName = useSelector(state => state.editModuleName);
  const modalOpen = useSelector(state => state.modalOpen);
  const linkModalOpen = useSelector(state => state.linkModalOpen);
  const links = useSelector(state => state.links);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedModules = JSON.parse(localStorage.getItem('modules')) || [];
    setModules(storedModules);

    const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    setUploadedFiles(storedFiles);

    const storedLinks = JSON.parse(localStorage.getItem('links')) || [];
    dispatch(setLinks(storedLinks));
  }, [dispatch]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionSelect = (option) => {
    if (option === 'module') {
      setDropdownOpen(false);
      dispatch(openModal());
    } else if (option === 'link') {
      setDropdownOpen(false);
      dispatch(openLinkModal());
    } else if (option === 'upload') {
      document.getElementById('fileInput').click();
      setDropdownOpen(false);
    } else {
      setDropdownOpen(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
      const updatedFiles = [...storedFiles, selectedFile.name];
      localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));

      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        localStorage.setItem(selectedFile.name, fileContent);
        setSelectedFile(null);
        setUploadedFiles(updatedFiles);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const toggleModuleDropdown = (index) => {
    setOpenedModuleIndex(openedModuleIndex === index ? null : index);
    setOpenedFileIndex(null);
    setOpenedLinkIndex(null);
  };

  const toggleFileDropdown = (index) => {
    setOpenedFileIndex(openedFileIndex === index ? null : index);
    setOpenedModuleIndex(null);
    setOpenedLinkIndex(null);
  };

  const toggleLinkDropdown = (index) => {
    setOpenedLinkIndex(openedLinkIndex === index ? null : index);
    setOpenedModuleIndex(null);
    setOpenedFileIndex(null);
  };

  const handleEditModule = (index) => {
    const moduleName = modules[index];
    dispatch(setEditModuleName(moduleName));
    dispatch(openEditModal(moduleName, index));
  };

  const handleDeleteModule = (index) => {
    const updatedModules = [...modules];
    updatedModules.splice(index, 1);
    setModules(updatedModules);
    localStorage.setItem('modules', JSON.stringify(updatedModules));

    if (openedModuleIndex === index) {
      setOpenedModuleIndex(null);
    }
  };

  const handleDeleteFile = (fileName, index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));

    localStorage.removeItem(fileName);
  };

  const handleDownload = (fileName) => {
    const fileContent = localStorage.getItem(fileName);
    if (fileContent) {
      const blob = dataURLtoBlob(fileContent);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      console.error(`File '${fileName}' not found in localStorage.`);
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleEditLink = (index) => {
    console.log(`Edit link at index ${index}`);
  };

  const handleDeleteLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    localStorage.setItem('links', JSON.stringify(updatedLinks));

    dispatch(setLinks(updatedLinks));
  };

  return (
    <>
      <div className='nav'>
        <div className='title'>Course Builder</div>
        <div className='dropdown-container'>
          <div className='create-button' onClick={toggleDropdown}>
            <div><img className='add' src={addIcon} alt="Add Icon" /></div>
            <div>Add</div>
          </div>
          {dropdownOpen && (
            <div className="dropdown">
              <div className="dropdown-content">
                <div className="dropdown-option" onClick={() => handleOptionSelect('module')}>
                  <div><img className='options-image' src={moduleIcon} alt="Module Icon" /></div>
                  <div>Create Module</div>
                </div>
                <div className="dropdown-option" onClick={() => handleOptionSelect('link')}>
                  <img className='options-image' src={linkIcon} alt="Link Icon" />
                  Add a Link
                </div>
                <div className='create-buttn' style={{ width: "200px", backgroundColor: "white" }}>
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    name="file"
                  />
                </div>
                <div className="dropdown-option" onClick={handleUpload}>
                  <img className='options-image' src={uploadIcon} alt="Upload Icon" />
                  Upload
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {modules.length === 0 && uploadedFiles.length === 0 && (
        <div className='center-image'>
          <img src={centreImage} alt="Center Image" />
        </div>
      )}

      <Modal />

      <EditModal
        isOpen={editModalOpen}
        moduleName={editModuleName}
        onClose={() => dispatch(closeEditModal())}
      />

      {linkModalOpen && <LinkModal />}

      <div className="modules-container">
        {modules.map((moduleName, index) => (
          <div key={index} className="module-item">
            <div>
              {moduleName}
              <p style={{ fontWeight: "300", fontSize: "small", marginTop: "2px", color: "gray" }}>Add items to this module</p>
            </div>
            <div className='burger-button' onClick={() => toggleModuleDropdown(index)}>
              <img src={burger} alt="Burger Icon" />
            </div>
            {openedModuleIndex === index && (
              <div className="dropdown-menu" style={{ top: `${35 + index * 100}px`, right: "0" }}>
                <div style={{ display: "flex" }} className="dropdown-option" onClick={() => handleEditModule(index)}>
                  <div style={{ marginRight: "10px", marginTop: "5px" }}><img src={editIcon} alt="Edit Icon" /></div>
                  <div>
                    Edit Module Name
                  </div>
                </div>
                <div style={{ color: "#D33852", display: "flex" }} className="dropdown-option" onClick={() => handleDeleteModule(index)}>
                  <div style={{ marginRight: "10px", marginTop: "5px" }}>
                    <img src={deleteIcon} alt="Delete Icon" />
                  </div>
                  <div>Delete</div>
                </div>
              </div>
            )}
          </div>
        ))}

        {uploadedFiles.map((fileName, index) => (
          <div key={index} className="module-item">
            <div style={{ display: "flex" }}>
              <div><img src={fileLogo} alt="File Icon" /></div>
              <div>{fileName}</div>
            </div>
            <div className='burger-button' onClick={() => toggleFileDropdown(index)}>
              <img src={burger} alt="Burger Icon" />
            </div>
            {openedFileIndex === index && (
              <div className="dropdown-menu" style={{ top: `${35 + index * 100}px`, right: "0" }}>
                <div style={{ display: "flex" }} className="dropdown-option" onClick={() => handleDownload(fileName)}>
                  <div style={{ marginRight: "10px", marginTop: "5px" }}><img src={downloadIcon} alt="Download Icon" /></div>
                  <div>Download</div>
                </div>
                <div style={{ color: "#D33852", display: "flex" }} className="dropdown-option" onClick={() => handleDeleteFile(fileName, index)}>
                  <div style={{ marginRight: "10px", marginTop: "5px" }}>
                    <img src={deleteIcon} alt="Delete Icon" />
                  </div>
                  <div>Delete File</div>
                </div>
              </div>
            )}
          </div>
        ))}

        {links.map((link, index) => (
          <div key={index} className="module-item">
            <div style={{ display: "flex" }}>
              <div><img src={linkLogo} alt="Link Icon" /></div>
              <a style={{ textDecoration: "none", color: "black", marginLeft: "10px" }} href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
            </div>
            <div className='burger-button' onClick={() => toggleLinkDropdown(index)}>
              <img src={burger} alt="Burger Icon" />
            </div>
            {openedLinkIndex === index && (
              <div className="dropdown-menu" style={{ top: `${35 + index * 100}px`, right: "0" }}>
                <div className="dropdown-option" onClick={() => handleEditLink(index)}>
                  <div style={{ marginRight: "5px", marginTop: "5px" }}><img src={editIcon} alt="Edit Icon" /></div>
                  Edit
                </div>
                <div style={{ color: "#D33852" }} className="dropdown-option" onClick={() => handleDeleteLink(index)}>
                  <div style={{ marginRight: "5px", marginTop: "5px" }}><img src={deleteIcon} alt="Delete Icon" /></div>
                  Delete
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Homepage;
