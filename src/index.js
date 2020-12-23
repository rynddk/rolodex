import './index.css';
import 'wicg-inert';
import { LocationProvider, Router } from '@reach/router';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <LocationProvider>
            <Router>
                <App path="/rolodex/*contactId" />
            </Router>
        </LocationProvider>
    </React.StrictMode>,
    document.getElementById('main')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
