import React, { useEffect, useState } from 'react';
import ContactCard from '../cards/contactCard';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import styles from './contactList.module.css';

const renderContact = (contact, itemId, handleClose, queryParams) => (
    <aside
        className={styles.selectedContact}
        id="contact-detail" tabIndex="-1"
        role="dialog"
        aria-label={`${contact.name.first} ${contact.name.last}'s Contact Information'`}
    >
        <ContactCard data={contact} contactId={itemId} selected details onClose={handleClose} queryParams={queryParams} />
    </aside>
);

const renderInstructions = () => (
    <aside className={styles.noSelectedContent} id="contact-detail">
        <p className={styles.instructions}>Select a contact to view their details.</p>
    </aside>
);

const renderItem = (contact, selectedItem, setSelectedItem, queryParams) => {
    const { itemId, name = {} } = contact;
    const { first = '', last = '' } = name;
    const contactUrl = encodeURIComponent(`${first}-${last}`);
    const urlSuffix = queryParams || '/';

    return (
        <li
            key={itemId}
            className={styles.contactListItem}
            data-selected={selectedItem === itemId}
        >
            <Link
                to={`/rolodex/${contactUrl}${urlSuffix}`}
                onClick={() => {
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
            </Link>
        </li>
    );
};

const ContactList = (props) => {
    const { allContacts, contacts, currentContact, queryParams, refProp } = props;
    const [selectedItem, setSelectedItem] = useState(0);
    const handleClose = () => setSelectedItem();
    const currentData = allContacts.find((contact) => contact.contactUrl === currentContact);
    const displayedContact = selectedItem?.data || currentData;
    const displayedId = selectedItem?.itemId || currentData?.itemId;

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
                    id="contact-list"
                    ref={refProp}
                    tabIndex="-1"
                >
                    {contacts.map((contact) => renderItem(contact, selectedItem?.itemId, setSelectedItem, queryParams))}
                </ul>
            </main>

            {displayedContact ? renderContact(displayedContact, displayedId, handleClose, queryParams) : renderInstructions()}
        </>
    );
};

ContactList.defaultProps = {
    allContacts: [],
    contacts: [],
    currentContact: '',
    queryParams: ''
};

ContactList.propTypes = {
    allContacts: PropTypes.arrayOf(
        PropTypes.shape({
            contactUrl: PropTypes.string,
            gender: PropTypes.string,
            itemId: PropTypes.string,
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
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            gender: PropTypes.string,
            itemId: PropTypes.string,
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
    currentContact: PropTypes.string,
    queryParams: PropTypes.string,
    refProp: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.instanceOf(Element)
        })
    ]).isRequired
};

export default ContactList;
