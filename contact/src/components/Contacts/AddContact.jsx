import {Link} from "react-router-dom";
import { useContext } from "react";

import { ContactContext } from "../../context/contactContext";
import {Spinner} from "../";
import {COMMENT, GREEN, PURPLE, FOREGROUND} from "../../helpers/colors";


const AddContact = () => {
    const {loading, contact, onContactChange, groups, createContact} = useContext(ContactContext);

    return (
        <>
            {loading ? (<Spinner/>) : (

                <section className="p-3">
                    <img src={require("../../asessts/1657009506_27-illustration_png.png")}
                         height="600px"
                         style={{
                             position: "absolute",
                             zIndex: "-1",
                             top: "180px",
                             left: "200px",
                             opacity: "90%"
                         }}/>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p className="h4 fw-bold text-center"
                                   style={{color: GREEN}}>ساخت مخاطب جدید</p>
                            </div>
                        </div>
                        <hr style={{backgroundColor: GREEN}}/>
                        <div className="row " style={{marginTop: "120px"}}>
                            <div className="col-md-4">
                                <form onSubmit={createContact}>
                                    <div className="mb-2">
                                        <input name="fullname" value={contact.fullname} onChange={onContactChange}
                                               type="text" className="form-control" placeholder="نام نام خانوادکی"
                                               required={true}/>
                                    </div>
                                    <div className="mb-2">
                                        <input name="photo" type="text" value={contact.photo} onChange={onContactChange}
                                               className="form-control" placeholder="آدرس تصویر" required={true}/>
                                    </div>
                                    <div className="mb-2">
                                        <input name="mobile" type="number" value={contact.mobile}
                                               onChange={onContactChange} className="form-control"
                                               placeholder="شماره موبایل" required={true}/>
                                    </div>
                                    <div className="mb-2">
                                        <input name="email" type="email" value={contact.email} onChange={onContactChange}
                                               className="form-control" placeholder="آدرس ایمیل" required={true}/>
                                    </div>
                                    <div className="mb-2">
                                        <input name="job" type="text" value={contact.job} onChange={onContactChange}
                                               className="form-control" placeholder="شغل" required={true}/>
                                    </div>
                                    <div className="mb-2">
                                        <select name="group" value={contact.group} onChange={onContactChange}
                                                className="form-control" required={true}>
                                            <option value="">انتخاب گروه</option>
                                            {groups.length > 0 && groups.map((group) => (
                                                <option key={group.id} value={group.id}>{group.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mx-2">
                                        <input type="submit" className="btn"
                                               style={{backgroundColor: PURPLE, color: FOREGROUND}} value="ساخت مخاطب"/>
                                        <Link to={"/contacts"} className="btn mx-2"
                                              style={{backgroundColor: COMMENT, color: FOREGROUND}}>انصراف</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>)}
        </>
    );
};

export default AddContact;
