// modalReducer.js

const initialState = {
  modalOpen: false,
  selectedOption: '',
  openedModuleIndex: null,
  editModalOpen: false,
  editModuleName: '',
  uploadedFiles: [],
  openedFileIndex: null,
  editFileModalOpen: false,
  editFileIndex: null,
  linkModalOpen: false,
  links: [], // New state to store links
};

const SET_LINKS = 'SET_LINKS';
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
const SET_SELECTED_OPTION = 'SET_SELECTED_OPTION';
const SET_OPENED_MODULE_INDEX = 'SET_OPENED_MODULE_INDEX';
const OPEN_EDIT_MODAL = 'OPEN_EDIT_MODAL';
const CLOSE_EDIT_MODAL = 'CLOSE_EDIT_MODAL';
const SET_EDIT_MODULE_NAME = 'SET_EDIT_MODULE_NAME';
const EDIT_FILE_NAME = 'EDIT_FILE_NAME';
const SET_OPENED_FILE_INDEX = 'SET_OPENED_FILE_INDEX';
const OPEN_EDIT_FILE_MODAL = 'OPEN_EDIT_FILE_MODAL';
const CLOSE_EDIT_FILE_MODAL = 'CLOSE_EDIT_FILE_MODAL'; // New action type for closing edit file modal
const SET_EDIT_FILE_INDEX = 'SET_EDIT_FILE_INDEX'; // New action type for setting edit file index
const OPEN_LINK_MODAL = 'OPEN_LINK_MODAL';
const CLOSE_LINK_MODAL = 'CLOSE_LINK_MODAL';


const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false,
        linkModalOpen: false, // Close link modal when closing main modal
      };
    case SET_SELECTED_OPTION:
      return {
        ...state,
        selectedOption: action.payload,
      };
    case SET_OPENED_MODULE_INDEX:
      return {
        ...state,
        openedModuleIndex: action.payload,
      };
    case OPEN_EDIT_MODAL:
      return {
        ...state,
        editModalOpen: true,
        editModuleName: action.payload.moduleName,
        openedModuleIndex: action.payload.index,
      };
    case CLOSE_EDIT_MODAL:
      return {
        ...state,
        editModalOpen: false,
        editModuleName: '',
        openedModuleIndex: null,
      };
    case SET_EDIT_MODULE_NAME:
      return {
        ...state,
        editModuleName: action.payload,
      };
    case EDIT_FILE_NAME:
      const updatedFiles = [...state.uploadedFiles];
      updatedFiles[action.payload.index] = action.payload.newFileName;
      return {
        ...state,
        uploadedFiles: updatedFiles,
      };
    case SET_OPENED_FILE_INDEX:
      return {
        ...state,
        openedFileIndex: action.payload,
      };
    case OPEN_EDIT_FILE_MODAL:
      return {
        ...state,
        editFileModalOpen: true,
        editFileIndex: action.payload,
      };
    case CLOSE_EDIT_FILE_MODAL:
      return {
        ...state,
        editFileModalOpen: false,
        editFileIndex: null,
      };
    case SET_EDIT_FILE_INDEX:
      return {
        ...state,
        editFileIndex: action.payload,
      };
    case OPEN_LINK_MODAL:
      return {
        ...state,
        linkModalOpen: true,
      };
    case CLOSE_LINK_MODAL:
      return {
        ...state,
        linkModalOpen: false,
      };
    case SET_LINKS: // Action to set links in state
      return {
        ...state,
        links: action.payload,
      };
    default:
      return state;
  }
};

export const openModal = () => ({ type: OPEN_MODAL });
export const closeModal = () => ({ type: CLOSE_MODAL });
export const setSelectedOption = (option) => ({
  type: SET_SELECTED_OPTION,
  payload: option,
});
export const setOpenedModuleIndex = (index) => ({
  type: SET_OPENED_MODULE_INDEX,
  payload: index,
});
export const openEditModal = (moduleName, index) => ({
  type: OPEN_EDIT_MODAL,
  payload: {
    moduleName,
    index,
  },
});
export const closeEditModal = () => ({ type: CLOSE_EDIT_MODAL });
export const setEditModuleName = (moduleName) => ({
  type: SET_EDIT_MODULE_NAME,
  payload: moduleName,
});
export const editFileName = (index, newFileName) => ({
  type: EDIT_FILE_NAME,
  payload: {
    index,
    newFileName,
  },
});
export const setOpenFileIndex = (index) => ({
  type: SET_OPENED_FILE_INDEX,
  payload: index,
});
export const openEditFileModal = (index) => ({
  type: OPEN_EDIT_FILE_MODAL,
  payload: index,
});
export const closeEditFileModal = () => ({ type: CLOSE_EDIT_FILE_MODAL }); // Action creator for closing edit file modal
export const setEditFileIndex = (index) => ({
  type: SET_EDIT_FILE_INDEX,
  payload: index,
});
export const openLinkModal = () => ({ type: OPEN_LINK_MODAL });
export const closeLinkModal = () => ({ type: CLOSE_LINK_MODAL });

export const setLinks = (links) => ({ // Action creator to set links
  type: SET_LINKS,
  payload: links,
});

export default modalReducer;
