import { CSVLink } from 'react-csv';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { ReactComponent as ReactClose } from '../../assets/icons/close.svg';
import { ReactComponent as ReactDownload } from '../../assets/icons/download.svg';
import { ReactComponent as ReactEmail } from '../../assets/icons/email.svg';
import { ReactComponent as ReactPhone } from '../../assets/icons/phone.svg';
import { formatDataForExport } from '../../utils/export';
import headerStyles from '../header/header.module.css';
import styles from './contactCard.module.css';

const buttonClick = (contactId, onClose) => {
    const contactLink = document.getElementById(contactId);
    onClose();

    // wait for the update, then focus the detail
    setTimeout(() => contactLink.focus(), 0);

    return null;
};

const getPronouns = (gender) => {
    if (gender.length) {
        if (gender === 'female') {
            return 'she/her';
        }

        if (gender === 'male') {
            return 'he/him';
        }

        return 'they/them';
    }

    return 'they/them';
};

const renderCloseButton = (contactId, onClose, queryParams) => (
    <Link
        to={`/rolodex${queryParams || '/'}`}
        role="button"
        arial-label="Go back to contact list"
        onClick={() => buttonClick(contactId, onClose)}
        className={styles.closeButton}
    >
        <span className={styles.buttonText} aria-hidden="true"><ReactClose /></span>
    </Link>
);

const renderDownloadLink = (data, name) => {
    const exportData = formatDataForExport([data]);

    return (
        <CSVLink
            className={headerStyles.downloadButton}
            aria-label={`Download ${name}'s contact information`}
            filename={`Contact Info - ${name}`}
            data={exportData}
        >
            <span className={styles.buttonText} aria-hidden="true"><ReactDownload /></span>
        </CSVLink>
    );
};

const renderDetails = (data, contactName) => {
    const { gender, email, phone } = data;
    const pronouns = getPronouns(gender);

    return (
        <>
            <p
                aria-label={`${contactName}'s pronouns`}
                className={styles.contactPronouns}
            >
                ({pronouns})
            </p>

            <h3 className="rolo-hidden">{contactName}&apos;s Contact Details</h3>
            <address className={styles.contactAddress}>
                <a href={`mailto:${email}`} className={styles.contactDetail} aria-label={`Email ${contactName}`}>
                    <span className={styles.addressIcon} aria-hidden="true"><ReactEmail /></span>
                    {email}
                </a>
                <a href={`tel:${phone}`} className={styles.contactDetail} aria-label={`Call ${contactName}`}>
                    <span className={styles.addressIcon} aria-hidden="true"><ReactPhone /></span>
                    {phone}
                </a>
            </address>

            <footer className={styles.contactActions}>
                <div className={styles.actionButtonWrapper}>
                    {renderDownloadLink(data, contactName)}
                </div>
            </footer>
        </>
    );
};

const ContactCard = ({ contactId, data, details, onClose, queryParams }) => {
    const { name, picture } = data;
    const contactName = `${name.first} ${name.last}`;

    return (
        <div className={details ? styles.fullContactCard : styles.contactCard}>
            <picture className={styles.contactImageContainer}>
                <source srcSet={`${picture.thumbnail} 300w, ${picture.medium} 480w, ${picture.large} 960w`} />
                <img src={picture.thumbnail} alt={`A photo of ${contactName}`} />
            </picture>
            {details ? renderCloseButton(contactId, onClose, queryParams) : null}

            <div className={styles.contactDetails}>
                {details ? <h2 className={styles.contactName} aria-label="Name">{contactName}</h2> : <p className={styles.contactName} aria-label="Name">{contactName}</p>}

                {details ? renderDetails(data, contactName) : null}
            </div>
        </div>
    );
};

ContactCard.defaultProps = {
    contactId: '',
    data: {
        gender: '',
        name: {
            first: '',
            last: ''
        },
        email: '',
        phone: '',
        picture: {
            large: ''
        }
    },
    details: false,
    onClose: () => null,
    queryParams: ''
};

ContactCard.propTypes = {
    contactId: PropTypes.string,
    data: PropTypes.shape({
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
    }),
    details: PropTypes.bool,
    onClose: PropTypes.func,
    queryParams: PropTypes.string
};

export default ContactCard;
