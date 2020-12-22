import { CSVLink } from 'react-csv';
import PropTypes from 'prop-types';
import React from 'react';
import { ReactComponent as ReactDownload } from '../../assets/icons/download.svg';
import styles from './header.module.css';

const renderButton = (contacts, currentPage) => (
    <div className={styles.actions}>
        <CSVLink
            className={styles.downloadButton}
            aria-label={`Download these ${contacts.length} contacts`}
            filename={`Contacts_Page-${currentPage}`}
            data={contacts}
        >
            <span className={styles.buttonIcon} aria-hidden="true"><ReactDownload /></span>
        </CSVLink>
    </div>
);

const Header = ({ currentContacts, currentPage }) => (
    <header className={styles.header}>
        <div className={styles.headerContent}>
            <h1 className={styles.appTitle}>Contacts</h1>
            {currentContacts.length ? renderButton(currentContacts, currentPage) : null}
        </div>
    </header>
);

Header.defaultProps = {
    currentContacts: [],
    currentPage: 0
};

Header.propTypes = {
    currentContacts: PropTypes.arrayOf(
        PropTypes.shape({
            gender: PropTypes.string,
            name: PropTypes.shape({
                first: PropTypes.string,
                last: PropTypes.string,
                title: PropTypes.string
            }),
            email: PropTypes.string,
            phone: PropTypes.string,
            picture: PropTypes.shape({
                large: PropTypes.string,
                medium: PropTypes.string,
                thumbnail: PropTypes.string
            })
        })
    ),
    currentPage: PropTypes.number
};

export default Header;
