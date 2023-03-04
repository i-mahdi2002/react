import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

import _ from "lodash";

import { ContactContext } from "./context/contactContext";

import "./App.css";

import {
  AddContact,
  Contacts,
  EditContact,
  Navbar,
  ViewContact,
} from "./components";

import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from "./services/contactService";

import {
  BACKGROUND,
  COMMENT,
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
} from "./helpers/colors";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({});
  const [contactQuery, setContactQuery] = useState({ text: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createContact(contact);
      if (status === 201) {
        const allContacts = [...contacts, data];
        setContacts(allContacts);
        setFilteredContacts(allContacts);

        setContact({});
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setLoading((prevLoading) => !prevLoading);
    }
  };
  const onContactChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}> پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای {contactFullname} رو پاک کنی؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };
  const removeContact = async (contactId) => {
    const allContacts = [...contacts];
    try {
      setLoading(true);

      // Contact Copy

      const updateContact = contacts.filter((c) => c.id !== contactId);
      setContacts(updateContact);
      setFilteredContacts(updateContact);

      // Sending delete request to server
      const { status } = await deleteContact(contactId);

      setLoading(false);
      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);

      setContacts(allContacts);
      setFilteredContacts(allContacts);
    }
  };

  //   let filterTimeout;
  const contactSearch = (event) => {
    if (!event) return setFilteredContacts([...contacts]);

    // clearTimeout(filterTimeout);

    setContactQuery({ ...contactQuery, text: event.target.value });

    const debounce = _.debounce(() => {
      // filterTimeout = setTimeout(() => {
      const allContacts = contacts.filter((contact) => {
        return contact.fullname
          .toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setFilteredContacts(allContacts);
      // }, 1000);
    }, 1000);
    debounce();
  };
  return (
    <ContactContext.Provider
      value={{
        // loading: loading,
        // setLoading: setLoading,
        // contact: contact,
        // setContact: setContact,
        //     because key = value =>
        loading,
        setLoading,
        contact,
        setContact,
        contacts,
        setContacts,
        setFilteredContacts,
        filteredContacts,
        contactQuery,
        setContactQuery,
        groups,
        onContactChange,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
