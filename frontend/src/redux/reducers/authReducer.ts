const initialState = {
    user: null,
    token: null,
  };
  
  const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'LOGIN':
      case 'REGISTER':
        localStorage.setItem('token', action.payload.token);
        return { ...state, user: action.payload.user, token: action.payload.token };
      case 'LOGOUT':
        localStorage.removeItem('token');
        return { ...state, user: null, token: null };
      default:
        return state;
    }
  };
  
  export default authReducer;