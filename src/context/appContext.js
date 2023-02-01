import axios from 'axios';
import '../axios';
import React, { useContext, useEffect, useReducer } from 'react';
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
import reducer from './reducer';

const initialState = {
  user: null,
  isLoading: false,
  showAlert: false,
  alertMessage: 'there was an error, please try again',
  jobs: [],
  editItem: null,
  singleJobError: false,
  editComplete: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  // register user
  const register = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post(`/auth/register`, { ...userInput });
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name });
      localStorage.setItem(
        'user',
        JSON.stringify({ user: data.user.name, token: data.token })
      );
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR, payload: error.response.data.msg });
    }
  };

  // login user
  const login = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post(`/auth/login`, { ...userInput });

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name });
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, token: data.token })
      );
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR, payload: error.response.data.msg });
    }
  };

  // logout user
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: LOGOUT_USER });
  };

  // fetch all jobs
  const fetchJobs = async () => {
    setLoading();

    try {
      const { data } = await axios.get(`/jobs`);
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: data.jobs });
    } catch (error) {
      dispatch({ type: FETCH_JOBS_ERROR });
      logout();
    }
  };

  // create job
  const createjob = async (userInput) => {
    setLoading();

    try {
      const { data } = await axios.post(`/jobs`, { ...userInput });
      dispatch({ type: CREATE_JOB_SUCCESS, payload: data.job });
    } catch (error) {
      dispatch({ type: CREATE_JOB_ERROR, payload: error.response.data.msg });
    }
  };

  // delete job
  const deleteJob = async (id) => {
    setLoading();
    try {
      await axios.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.log(error);
      dispatch({ type: DELETE_JOB_ERROR, payload: error.response.data.msg });
    }
  };

  // fetch single job
  const fetchSingleJob = async (jobId) => {
    setLoading();
    try {
      const { data } = await axios.get(`jobs/${jobId}`);
      dispatch({ type: FETCH_SINGLE_JOB_SUCCESS, payload: data.job });
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_JOB_ERROR });
    }
  };

  // edit job
  const editJob = async (jobId, userInput) => {
    setLoading();
    try {
      const { data } = await axios.patch(`/jobs/${jobId}`, {
        ...userInput,
      });
      dispatch({ type: EDIT_JOB_SUCCESS, payload: data.job });
    } catch (error) {
      dispatch({ type: EDIT_JOB_ERROR, payload: error.response.data.msg });
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      const newUser = JSON.parse(user);
      dispatch({ type: SET_USER, payload: newUser.name });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setLoading,
        register,
        login,
        logout,
        fetchJobs,
        createjob,
        deleteJob,
        fetchSingleJob,
        editJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
