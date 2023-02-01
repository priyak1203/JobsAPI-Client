import {
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  DELETE_JOB_ERROR,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  FETCH_JOBS_ERROR,
  FETCH_JOBS_SUCCESS,
  FETCH_SINGLE_JOB_ERROR,
  FETCH_SINGLE_JOB_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  SET_LOADING,
  SET_USER,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        isLoading: true,
        showAlert: false,
        editComplete: false,
      };
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

    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
        showAlert: false,
        jobs: [],
        editComplete: false,
        editItem: null,
      };
    }

    case SET_USER: {
      return { ...state, user: action.payload };
    }

    case FETCH_JOBS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        editItem: null,
        singleJobError: false,
        jobs: action.payload,
        editComplete: false,
      };
    }

    case FETCH_JOBS_ERROR: {
      return { ...state, isLoading: false };
    }

    case CREATE_JOB_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        jobs: [...state.jobs, action.payload],
      };
    }

    case CREATE_JOB_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertMessage: action.payload,
      };
    }

    case DELETE_JOB_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertMessage: action.payload,
      };
    }

    case FETCH_SINGLE_JOB_SUCCESS: {
      return { ...state, isLoading: false, editItem: action.payload };
    }

    case FETCH_SINGLE_JOB_ERROR: {
      return {
        ...state,
        isLoading: false,
        editItem: null,
        singleJobError: true,
      };
    }

    case EDIT_JOB_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        editItem: action.payload,
        editComplete: true,
      };
    }

    case EDIT_JOB_ERROR: {
      return {
        ...state,
        isLoading: false,
        editComplete: true,
        showAlert: true,
        alertMessage: action.payload,
      };
    }

    default:
      throw new Error(`no such action : ${action}`);
  }
};

export default reducer;
