import PropTypes from 'prop-types';
import React from 'react';
import styles from './contactCard.module.css';

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

const ContactCard = ({ data, details, selected }) => {
    const { gender, name, email, phone, picture } = data;
    const contactName = `${name.first} ${name.last}`;
    const pronouns = getPronouns(gender);

    return (
        <div className={details ? styles.fullContactCard : styles.contactCard}>
            <picture className={styles.contactImageContainer}>
                <source srcSet={`${picture.thumbnail} 300w, ${picture.medium} 480w, ${picture.large} 960w`} />
                <img src={picture.thumbnail} alt={`A photo of ${contactName}`} />
            </picture>

            <div className={styles.contactDetails}>
                {details ? <h2 className={styles.contactName} aria-label="Name">{contactName}</h2> : <p className={styles.contactName} aria-label="Name">{contactName}</p>}

                <p
                    aria-label={`${contactName}'s pronouns`}
                    className={selected ? styles.contactPronouns : styles.hiddenPronouns}
                >
                    ({pronouns})
                </p>

                <address className={selected ? styles.selectedContactAddress : styles.contactAddress}>
                    <span className={styles.contactDetail} aria-label={`Email ${contactName}`}>{email}</span>
                    <span className={styles.contactDetail} aria-label={`Call ${contactName}`}>{phone}</span>
                </address>
            </div>
        </div>
    );
};

ContactCard.defaultProps = {
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
    selected: false
};

ContactCard.propTypes = {
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
    selected: PropTypes.bool
};

export default ContactCard;
