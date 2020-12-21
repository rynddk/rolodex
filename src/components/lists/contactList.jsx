import React, { useState } from 'react';
import ContactCard from '../cards/contactCard';
import PropTypes from 'prop-types';
import styles from './contactList.module.css';

const renderContact = (contact) => <ContactCard data={contact} selected details />;

const renderInstructions = () => <p className={styles.instructions}>Select a contact to view their details.</p>;

const ContactList = ({ contacts = [], refProp }) => {
    const [selectedItem, setSelectedItem] = useState(0);

    return (
        <div className={styles.contactListContainer}>
            <ul
                aria-activedescendant={selectedItem.itemId}
                aria-label="Contact List"
                className={styles.contactList}
                ref={refProp}
                tabIndex="-1"
            >
                {contacts.map((contact, index) => {
                    const { id = {}, name = {} } = contact;
                    const { first = '', last = '' } = name;
                    const { value: key } = id;
                    const uniqueId = key || `${first}-${index}`;
                    const itemId = uniqueId.replace(/\s+/gu, '-').replace(/\./gu, '').toLowerCase();

                    return (
                        <li
                            key={itemId}
                            aria-selected={selectedItem.itemId === itemId}
                            className={styles.contactListItem}
                        >
                            <a
                                href={`/${itemId}`}
                                onClick={(event) => {
                                    event.preventDefault();
                                    setSelectedItem({
                                        data: contact,
                                        itemId
                                    });
                                }}
                                role="button"
                                aria-label={`View contact information for ${first} ${last}`}
                                className={styles.contactLink}
                            >
                                <ContactCard data={contact} selected={selectedItem.itemId === itemId} />
                            </a>
                        </li>
                    );
                })}
            </ul>

            <div className={styles.selectedContact}>
                {selectedItem && selectedItem.data ? renderContact(selectedItem.data) : renderInstructions()}
            </div>
        </div>
    );
};

ContactList.defaultProps = {
    contacts: []
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
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
    refProp: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.instanceOf(Element)
        })
    ]).isRequired
};

export default ContactList;
