import './App.css';
import React, { Component } from 'react';
import ContactList from './components/lists/contactList';
import Header from './components/header/header';
import Loading from './components/loading/loading';
import Pagination from './components/pagination/pagination';
import PropTypes from 'prop-types';
import axios from 'axios';
import { formatDataForExport } from './utils/export';
import { formatRequestUrl } from './utils/api';
import paginationStyles from './components/pagination/pagination.module.css';
import { sortAlphaByParam } from './utils/sorting';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allContacts: [],
            pageCount: 0,
            perPage: 10
        };

        this.contactList = React.createRef();
        this.focusContactList = this.focusContactList.bind(this);
    }

    componentDidMount() {
        const minLoadTime = 1000;

        setTimeout(() => this.fetchData(), minLoadTime);
    }

    fetchData() {
        const requestedResults = 83;
        const requestUrl = formatRequestUrl(1, requestedResults);

        axios.get(requestUrl)
            .then((res) => {
                const { perPage } = this.state;
                const { data: { results } } = res;
                results.map((item, index) => {
                    const { id = {}, name: { first = '', last = '' } } = item;
                    const uniqueId = id?.value || `${first}-${index}`;
                    item.itemId = uniqueId.replace(/\s+/gu, '-').replace(/\./gu, '').toLowerCase();
                    item.contactUrl = encodeURIComponent(`${first}-${last}`);

                    return item;
                });
                const alphabeticalData = sortAlphaByParam(results, 'first', 'last');

                this.setState({
                    allContacts: alphabeticalData,
                    pageCount: Math.ceil(results.length / perPage)
                });
            });
    }

    focusContactList() {
        this.contactList.current.focus();
        window.scrollTo(0, 0);
    }

    renderLoader = () => (
        <main id="rolodex">
            <Loading />
        </main>
    );

    getPageCards(page) {
        const { allContacts, perPage } = this.state;
        const pageOffset = parseInt(perPage, 10) * parseInt(page - 1, 10);

        return allContacts.slice(pageOffset, pageOffset + perPage);
    }

    renderPagination(pageNum) {
        const { pageCount } = this.state;
        const { contactId } = this.props;

        return (
            <nav className={paginationStyles.listContainer} aria-label="Contact List Page Navigation">
                <Pagination current={pageNum} total={pageCount} contactId={contactId} />
            </nav>
        );
    }

    render() {
        const { allContacts, pageCount } = this.state;
        const { contactId, location: { search } } = this.props;
        const searchParamTrim = 6;
        const selectedPage = search.substr(searchParamTrim);
        const pageNum = selectedPage ? parseInt(selectedPage, 10) : 1;
        const displayedContacts = this.getPageCards(pageNum);
        const exportData = formatDataForExport(displayedContacts);

        return (
            <>
                <div id="content" className="rolo-main-content">
                    <Header currentContacts={exportData} currentPage={pageNum} />
                </div>

                { displayedContacts.length ? (
                    <ContactList
                        allContacts={allContacts}
                        contacts={displayedContacts}
                        currentContact={contactId}
                        refProp={this.contactList}
                        queryParams={search}
                    />
                ) : this.renderLoader() }


                <footer className="rolo-footer" id="footer">
                    {pageCount > 1 ? this.renderPagination(pageNum) : null}
                </footer>
            </>
        );
    }
}

App.defaultProps = {
    contactId: '',
    location: {
        search: ''
    }
};

App.propTypes = {
    contactId: PropTypes.string,
    location: PropTypes.shape({
        search: PropTypes.string
    })
};
