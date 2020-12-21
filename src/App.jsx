import './App.css';
import React, { Component } from 'react';
import ContactCard from './components/cards/contactCard';
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
        <ul className="rolo-contact-list">
            {cards.map((card, index) => {
                const { id = {}, name = {} } = card;
                const { first = '' } = name;
                const { value: key } = id;

                return (
                    <li key={key || `${first}-${index}`} className="rolo-contact-card">
                        <ContactCard data={card} />
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
                <a href="#main" className="rolo-visually-hidden-link">Skip to Main Content</a>

                <header className="rolo-hidden">
                    <h1>Rolodex</h1>
                </header>

                <main id="main" className="rolo-main-content">
                    { cards.length ? this.renderList(cards) : this.renderLoader() }
                </main>
            </>
        );
    }
}
