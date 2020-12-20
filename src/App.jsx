import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    }

    componentDidMount() {
        axios.get(`https://randomuser.me/api/?page=1&results=10&inc=gender,name,picture,email,phone,id`)
            .then((res) => {
                this.setState({
                    cards: res.data.results
                });
            });
    }

    renderList = (cards) => (
        <ul>
            {cards.map((card, index) => {
                const { name = {}, id = {} } = card;
                const { first = '', last = '', title = '' } = name;
                const { value: key } = id;

                return (
                    <li key={key || `${first}-${index}`}>
                        {title} {first} {last}
                    </li>
                );
            })}
        </ul>
    );

    renderLoader = () => (
        <p>Loading...</p>
    );

    render() {
        const { cards = [] } = this.state;

        return (
            <>
                <header>
                    <a href="#main" className="App-link">Skip to Main Content</a>
                    <h1>Rolodex</h1>
                </header>

                <main id="main" className="App-header">
                    { cards.length ? this.renderList(cards) : this.renderLoader() }
                </main>
            </>
        );
    }
}
