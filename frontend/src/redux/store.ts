import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import clinicReducer from './reducers/clinicReducer';
import appointmentReducer from './reducers/appointmentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  clinics: clinicReducer,
  appointments: appointmentReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export default store;