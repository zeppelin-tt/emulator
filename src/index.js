import React from 'react';
import ReactDOM from 'react-dom';
import MainWindow from './MainWindow'
import {Provider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import './index.css';

const options = {
    timeout: 5500,
    position: "bottom center",
    transition: "scale"
};

const App = () => (
    <Provider template={AlertTemplate} {...options}>
        <MainWindow/>
    </Provider>
);

ReactDOM.render(
    <App/>, document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
