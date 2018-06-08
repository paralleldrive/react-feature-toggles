import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';
import { withButtons } from './hocs/withButtons';
const features = ['react', 'foo', 'bar'];

const Apps = withButtons(App)(features);

ReactDOM.render(<Apps />, document.getElementById('root'));
registerServiceWorker();
