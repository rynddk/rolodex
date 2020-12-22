import React, { useState } from 'react';
import ContactCard from '../cards/contactCard';
import PropTypes from 'prop-types';
import styles from './contactList.module.css';

const renderContact = (contact, itemId, handleClose) => <ContactCard data={contact} contactId={itemId} selected details onClose={handleClose} />;

const renderInstructions = () => <p className={styles.instructions}>Select a contact to view their details.</p>;

const renderItem = (contact, index, selectedItem, setSelectedItem) => {
    const { id = {}, name = {} } = contact;
    const { first = '', last = '' } = name;
    const uniqueId = id?.value || `${first}-${index}`;
    const itemId = uniqueId.replace(/\s+/gu, '-').replace(/\./gu, '').toLowerCase();

    return (
        <li
            key={itemId}
            className={styles.contactListItem}
            data-selected={selectedItem === itemId}
        >
            <a
                href={`/${itemId}`}
                onClick={(event) => {
                    event.preventDefault();
                    document.getElementById('contact-detail').focus();
                    setSelectedItem({
                        data: contact,
                        itemId
                    });
                }}
                id={itemId}
                role="button"
                aria-label={`View contact information for ${first} ${last}`}
                className={styles.contactLink}
            >
                <ContactCard data={contact} />
            </a>
        </li>
    );
};

const ContactList = ({ contacts = [], refProp }) => {
    const [selectedItem, setSelectedItem] = useState(0);
    const handleClose = () => setSelectedItem();

    return (
        <>
            <main id="main" className="rolo-main-content">
                <div className={styles.contactListContainer}>
                    <ul
                        aria-activedescendant={selectedItem?.itemId || null}
                        aria-label="Contact List"
                        className={styles.contactList}
                        ref={refProp}
                        tabIndex="-1"
                    >
                        {contacts.map((contact, index) => renderItem(contact, index, selectedItem?.itemId, setSelectedItem))}
                    </ul>
                </div>
            </main>

            <aside className={selectedItem && selectedItem?.data ? styles.selectedContact : styles.noSelectedContent} id="contact-detail" tabIndex="-1">
                {selectedItem && selectedItem?.data ? renderContact(selectedItem?.data, selectedItem?.itemId, handleClose) : renderInstructions()}
            </aside>
        </>
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
