import InputPane from './inputPane';
import SuggestionPane from './suggestionPane';
import React from 'react';

export default () => (
  <div className='row'>
    <div className='col-md-6'>
      <InputPane />
    </div>
    <div className='col-md-6'>
      <SuggestionPane />
    </div>
  </div>
)