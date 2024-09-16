import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;