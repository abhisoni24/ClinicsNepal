import { Dispatch } from 'redux';
import * as api from '../../api';

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.login(email, password);
    dispatch({ type: 'LOGIN', payload: data });
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const register = (name: string, email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.register(name, email, password);
    dispatch({ type: 'REGISTER', payload: data });
  } catch (error) {
    console.error('Registration error:', error);
  }
};
