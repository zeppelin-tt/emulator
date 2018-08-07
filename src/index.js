import React from 'react';
import ReactDOM from 'react-dom';
import MainWindow from './MainWindow'
import './index.css';

ReactDOM.render(
    <MainWindow/>, document.getElementById('root')
);
if (module.hot) {
    module.hot.accept();
}
