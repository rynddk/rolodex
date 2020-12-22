import PropTypes from 'prop-types';
import React from 'react';
import { ReactComponent as ReactClose } from '../../assets/icons/close.svg';
import { ReactComponent as ReactEmail } from '../../assets/icons/email.svg';
import { ReactComponent as ReactPhone } from '../../assets/icons/phone.svg';
import styles from './contactCard.module.css';

const buttonClick = (event, contactId, onClose) => {
    event.preventDefault();
    const contactLink = document.getElementById(contactId);
    contactLink.focus();
    onClose();

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

const renderButton = (contactId, onClose) => (
    <a
        href="/"
        role="button"
        arial-label="Go back to contact list"
        onClick={(event) => buttonClick(event, contactId, onClose)}
        className={styles.closeButton}
    >
        <span className={styles.buttonText} aria-hidden="true"><ReactClose /></span>
    </a>
);

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
        </>
    );
};

const ContactCard = ({ contactId, data, details, onClose }) => {
    const { name, picture } = data;
    const contactName = `${name.first} ${name.last}`;

    return (
        <div className={details ? styles.fullContactCard : styles.contactCard}>
            <picture className={styles.contactImageContainer}>
                <source srcSet={`${picture.thumbnail} 300w, ${picture.medium} 480w, ${picture.large} 960w`} />
                <img src={picture.thumbnail} alt={`A photo of ${contactName}`} />
            </picture>
            {details ? renderButton(contactId, onClose) : null}

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
    onClose: () => null
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
    onClose: PropTypes.func
};

export default ContactCard;
