import PropTypes from 'prop-types';
import React from 'react';
import styles from './contactCard.module.css';

const ContactCard = ({ data }) => {
    const { gender, name, email, phone, picture } = data;
    const contactName = `${name.first} ${name.last}`;

    return (
        <div className={styles.contactCard}>
            <picture className={styles.contactImageContainer}>
                <source srcSet={`${picture.thumbnail} 300w, ${picture.medium} 480w, ${picture.large} 960w`} />
                <img src={picture.thumbnail} alt={`A photo of ${contactName}`} />
            </picture>

            <div className={styles.contactDetails}>
                <h2 className={styles.contactName} aria-label="Name">{contactName}</h2>

                <address>
                    <span className={styles.contactDetail} aria-label={`Email ${contactName}`}>{email}</span>
                    <span className={styles.nonMobileContactDetail} aria-label={`Call ${contactName}`}>{phone}</span>
                </address>

                <p className={styles.nonMobileContactDetail} aria-label="Gender">{gender}</p>
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
    }
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
    })
};

export default ContactCard;
