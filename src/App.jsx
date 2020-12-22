import './App.css';
import React, { Component } from 'react';
import ContactList from './components/lists/contactList';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { sortAlphaByParam } from './utils/sorting';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allContacts: [],
            cards: [],
            offset: 0,
            pageCount: 0,
            perPage: 10
        };

        this.contactList = React.createRef();
        this.focusContactList = this.focusContactList.bind(this);

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        axios.get(`https://randomuser.me/api/?page=1&results=83&inc=gender,name,picture,email,phone,id&seed=e9649cdad6d59e77`)
            .then((res) => {
                const { offset, perPage } = this.state;
                const { data: { results } } = res;
                const alphabeticalData = sortAlphaByParam(results, 'first', 'last');
                const slicedData = alphabeticalData.slice(offset, offset + perPage);

                this.setState({
                    allContacts: results,
                    cards: slicedData,
                    pageCount: Math.ceil(results.length / perPage)
                });
            });
    }

    focusContactList() {
        this.contactList.current.focus();
        window.scrollTo(0, 0);
    }

    handlePageClick(event) {
        const selectedPage = event.selected;
        const { state: { allContacts, perPage } } = this;
        const offset = selectedPage * perPage;
        const slicedData = allContacts.slice(offset, offset + perPage);

        this.focusContactList();

        this.setState({
            cards: slicedData,
            offset
        });
    }

    renderList(cards) {
        const { pageCount } = this.state;

        return (
            <>
                <ContactList contacts={cards} refProp={this.contactList} />

                <nav className="rolo-pagination" aria-label="Contact List Page Navigation">
                    <ReactPaginate
                        previousLabel="prev"
                        nextLabel="next"
                        breakLabel="..."
                        pageCount={pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={this.handlePageClick}
                        containerClassName="rolo-pagination-list"
                        pageClassName="rolo-pagination-item"
                        pageLinkClassName="rolo-pagination-link"
                        activeClassName="rolo-pagination-active"
                        activeLinkClassName="rolo-pagination-link-active"
                        breakClassName="rolo-pagination-item"
                        breakLinkClassName="rolo-pagination-link"
                        nextClassName="rolo-pagination-item"
                        nextLinkClassName="rolo-pagination-link"
                        previousClassName="rolo-pagination-item"
                        previousLinkClassName="rolo-pagination-link"
                    />
                </nav>
            </>
        );
    }

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
