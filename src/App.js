import './App.css';
import React from 'react';
import logo from './logo.svg';

// eslint-disable-next-line no-extra-parens
const App = () => (
    <>
        <header>
            <a href="#main" className="App-link">Skip to Main Content</a>
            <h1>Rolodex</h1>
        </header>

        <main id="main" className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </main>
    </>
);

export default App;
