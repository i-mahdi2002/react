import {Fragment} from 'react';
import {RED, CYAN, ORANGE, CURRENTLINE, PINK, PURPLE, COMMENT} from '../../helpers/colors';
import {ContactContext} from "../../context/contactContext";

import {
    Contact,
    Spinner
} from "../index";

import { useContext } from 'react';
import {Link} from "react-router-dom";

// import Contact from "./Contact";

// import Spinner from "../Spinner";

const Contacts = () => {
    const {filteredContacts, loading, deleteContact} = useContext(ContactContext);

    return (
        <Fragment>
            <section className="container">
                <div className="grid">
                    <div className="row my-3">
                        <div className="col">
                            <div className="h3 float-end mt-2">
                                <Link to={"/contacts/add"} className="btn mx-2" style={{backgroundColor: PINK}}>
                                    <span>ایجاد مخاطب جدید</span>
                                    <i className="fa fa-plus-circle m-2"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> : (
                    <section className="container">
                        <div className="row">
                            {
                                filteredContacts.length > 0 ? filteredContacts.map((c) =>
                                    <Contact key={c.id} contact={c}
                                             deleteContact={() => deleteContact(c.id, c.fullname)}/>
                                ) : (
                                    <div className="text-center py-5" style={{backgroundColor: CURRENTLINE}}>
                                        <p className="h3" style={{color: ORANGE}}>
                                            مخاطب یافت نشد...
                                        </p>
                                        <img src={require("../../asessts/no-found.gif")} alt="پیدا نشد"
                                             className="w-25"/>
                                    </div>
                                )
                            }
                        </div>
                    </section>
                )
            }

        </Fragment>
    )
}

export default Contacts;