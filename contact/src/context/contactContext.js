import {createContext} from 'react';

export const ContactContext = createContext({
    loading: false,
    setLoading: () => {},
    contact: {},
    setContact: () => {},
    setFilteredContacts: () => {},
    filteredContacts: [],
    contacts: [],
    contactQuery: {},
    groups: [],
    onContactChange: () => {},
    deleteContact: () => {},
    createContact: () => {},
    contactSearch: () => {}
});