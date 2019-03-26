import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import store from '../store';

import Editor, { FairyEditorr } from './Editor'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <h1>React App Title</h1>
        <div>
          <FairyEditorr />
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))