import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './pagination.module.css';

const renderLink = (isLink, page, text, baseHref) => (isLink ? (
    <Link
        to={`${baseHref}?page=${page}`}
        className={styles.pageLink}
        aria-label={`Go to page ${page}`}
    >
        {text} Page
    </Link>
) : (
    <span
        className={styles.disabledLink}
        aria-label={`No ${text.toLowerCase()} page available`}
    >
        {text} Page
    </span>
));

const Pagination = ({ contactId, current, total }) => {
    const baseHref = contactId ? `/rolodex/${contactId}` : '';
    const pages = Array.from({ length: total }).map((page, index) => ({
        current: index + 1 === current,
        key: index + 1,
        text: `Go to page ${index + 1}`,
        route: `${baseHref}?page=${index + 1}`
    }));
    const currentPage = pages.find((page) => page.current);

    return (
        <ul className={styles.paginationList}>
            <li className={styles.paginationItem}>
                { renderLink(current > 1, current - 1, 'Previous', baseHref) }
            </li>

            <li className={styles.paginationItem}>
                <span
                    className={styles.currentPage}
                    aria-label={`Currently viewing page ${currentPage.key}`}
                >
                    {currentPage.key}
                </span>
            </li>

            <li className={styles.paginationItem}>
                { renderLink(total > current, current + 1, 'Next', baseHref) }
            </li>
        </ul>
    );
};

Pagination.defaultProps = {
    contactId: '',
    current: 0,
    total: 0
};

Pagination.propTypes = {
    contactId: PropTypes.string,
    current: PropTypes.number,
    total: PropTypes.number
};

export default Pagination;
