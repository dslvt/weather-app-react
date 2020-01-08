import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Card from './card';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<Card day="Wed" weather="lightning" low_temperature="12" high_temperature={33}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
