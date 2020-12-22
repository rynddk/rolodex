import './App.css';
import React, { Component } from 'react';
import ContactList from './components/lists/contactList';
import Header from './components/header/header';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { formatDataForExport } from './utils/export';
import { formatRequestUrl } from './utils/api';
import { sortAlphaByParam } from './utils/sorting';
import styles from './components/lists/contactList.module.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allContacts: [],
            cards: [],
            currentPage: 0,
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
        const requestedResults = 83;
        const requestUrl = formatRequestUrl(1, requestedResults);

        axios.get(requestUrl)
            .then((res) => {
                const { offset, perPage } = this.state;
                const { data: { results } } = res;
                const alphabeticalData = sortAlphaByParam(results, 'first', 'last');
                const slicedData = alphabeticalData.slice(offset, offset + perPage);

                this.setState({
                    allContacts: results,
                    cards: slicedData,
                    currentPage: 1,
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
            currentPage: selectedPage + 1,
            offset
        });
    }

    renderPagination() {
        const { pageCount } = this.state;

        return (
            <footer>
                <nav className="rolo-pagination" aria-label="Contact List Page Navigation">
                    <ReactPaginate
                        previousLabel="prev"
                        nextLabel="next"
                        breakLabel="more pages"
                        ariaLabelBuilder={(page, selected) => {
                            if (selected) {
                                return 'Current page';
                            }

                            return `Go to page ${page}`;
                        }}
                        pageCount={pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={this.handlePageClick}
                        containerClassName="rolo-pagination-list"
                        pageClassName="rolo-pagination-item"
                        pageLinkClassName="rolo-pagination-link"
                        activeClassName="rolo-pagination-active"
                        activeLinkClassName="rolo-pagination-link-active"
                        breakClassName="rolo-pagination-break-item rolo-pagination-item"
                        breakLinkClassName="rolo-break-link rolo-pagination-link"
                        nextClassName="rolo-pagination-item"
                        nextLinkClassName="rolo-pagination-link"
                        previousClassName="rolo-pagination-item"
                        previousLinkClassName="rolo-pagination-link"
                    />
                </nav>
            </footer>
        );
    }

    renderLoader = () => (
        <>
            <main id="main" className="rolo-main-content" />

            <aside id="contact-details" className={styles.noSelectedContent}>
                <p className="rolo-loading-text">Loading...</p>
            </aside>
        </>
    );

    render() {
        const { cards, currentPage } = this.state;
        const exportData = formatDataForExport(cards);

        return (
            <>
                <a href="#main" className="rolo-visually-hidden-link">Skip to Main Content</a>

                <Header currentContacts={exportData} currentPage={currentPage} />

                { cards.length ? <ContactList contacts={cards} refProp={this.contactList} /> : this.renderLoader() }

                {this.renderPagination()}
            </>
        );
    }
}
