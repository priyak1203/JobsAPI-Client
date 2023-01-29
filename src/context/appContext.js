import axios from 'axios';
import '../axios';
import React, { useContext, useReducer } from 'react';
import {
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  SET_LOADING,
} from './actions';
import reducer from './reducer';

const initialState = {
  user: null,
  isLoading: false,
  showAlert: false,
  alertMessage: 'there was an error, please try again',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  // register user
  const register = (userInput) => {
    console.log(userInput);
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

  return (
    <AppContext.Provider value={{ ...state, setLoading, register, login }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
