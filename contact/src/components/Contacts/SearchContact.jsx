import {PURPLE} from "../../helpers/colors";
import {ContactContext} from "../../context/contactContext";
import {useContext} from "react";

const SearchContact = ({query, search}) => {
    const {contactQuery, contactSearch} = useContext(ContactContext);
    return (
        <div className="input-group mx-5 my-3 w-75" dir="ltr">
            <span className="input-group-text" id="basic-addon1" style={{background: PURPLE}}>
                <i className="fas fa-search"/>
            </span>
            <input dir="rtl" type="text"
                   className="from-control w-75 ph-white" placeholder="جستجوی مخاطب" aria-label="Search"
                   aria-describedby="basic-addon1" value={contactQuery.text} onChange={contactSearch}/>
        </div>
    )
}

export default SearchContact;