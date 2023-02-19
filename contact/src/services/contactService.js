import axios from 'axios';

const SERVER_URL = "http://localhost:9000";

// @desc Get All contact
// @route Get https://localhost:900/contacts
export const getAllContacts = () => {
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
};

// @desc Get contact With Contact Id
// @route Get https://localhost:900/contacts/:cotactId
export const getContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url);
};

// @desc Get All group
// @route Get https://localhost:900/group
export const getAllGroups = () => {
    const url = `${SERVER_URL}/groups`;
    return axios.get(url);
};

// @desc Get group With Group Id
// @route Get https://localhost:900/group/:goupId
export const getGroup = (groupId) => {
    const url = `${SERVER_URL}/groups/${groupId}`;
    return axios.get(url);
};

// @desc Post contact With Contact Id
// @route Get https://localhost:900/contacts
export const createContact = (contact) => {
    const url = `${SERVER_URL}/contacts`;
    return axios.post(url, contact);
};

// @desc Put contact With Contact Id
// @route Get https://localhost:900/contacts/:contactId
export const updateContact = (contact, contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url, contact);
};

// @desc delete contact With Contact Id
// @route Get https://localhost:900/contacts
export const deleteContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url);
};


