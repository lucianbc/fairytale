import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <h1>React App Title</h1>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))