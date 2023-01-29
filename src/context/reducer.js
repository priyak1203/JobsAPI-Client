import {
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  SET_LOADING,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return { ...state, isLoading: true, showAlert: false };
    }

    case REGISTER_USER_SUCCESS: {
      return { ...state, isLoading: false, user: action.payload };
    }

    case REGISTER_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        user: null,
        showAlert: true,
        alertMessage: action.payload,
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
