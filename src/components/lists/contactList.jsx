import React, { useEffect, useState } from 'react';
import ContactCard from '../cards/contactCard';
import PropTypes from 'prop-types';
import styles from './contactList.module.css';

const renderContact = (contact, itemId, handleClose) => (
    <aside
        className={styles.selectedContact}
        id="contact-detail" tabIndex="-1"
        role="dialog"
        aria-label={`${contact.name.first} ${contact.name.last}'s Contact Information'`}
    >
        <ContactCard data={contact} contactId={itemId} selected details onClose={handleClose} />
    </aside>
);

const renderInstructions = () => (
    <aside className={styles.noSelectedContent} id="contact-detail">
        <p className={styles.instructions}>Select a contact to view their details.</p>
    </aside>
);

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
                    setSelectedItem({
                        data: contact,
                        itemId
                    });
                    // wait for the update, then focus the detail
                    setTimeout(() => document.getElementById('contact-detail').focus(), 0);
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

    useEffect(() => {
        const contentElem = document.getElementById('content');
        const footerElem = document.getElementById('footer');
        const listElem = document.getElementById('rolodex');

        contentElem.inert = selectedItem && selectedItem.data;
        footerElem.inert = selectedItem && selectedItem.data;
        listElem.inert = selectedItem && selectedItem.data;
    });

    return (
        <>
            <main id="rolodex" className={styles.contactListContainer}>
                <ul
                    aria-activedescendant={selectedItem?.itemId || null}
                    aria-label="Contact List"
                    className={styles.contactList}
                    id="contacts-list"
                    ref={refProp}
                    tabIndex="-1"
                >
                    {contacts.map((contact, index) => renderItem(contact, index, selectedItem?.itemId, setSelectedItem))}
                </ul>
            </main>

            {selectedItem && selectedItem.data ? renderContact(selectedItem?.data, selectedItem?.itemId, handleClose) : renderInstructions()}
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
