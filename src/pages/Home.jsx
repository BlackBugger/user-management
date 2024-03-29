/* eslint-disable no-unused-labels */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// REACT
import React, { useReducer } from 'react';
import { useState, useEffect } from 'react';

// COMPONENTS
import ADD from "../components/add_user/add_user";

// AXIOS - API
import axios from 'axios';
const api = axios.create({
    baseURL: "https://user-management-server.up.railway.app/",
    Accept: "application/json",
});

// OTHER FUNCTIONS
import { useNavigate } from 'react-router-dom';


// STYLES
import './home.css';
import LineIcon from "react-lineicons";


function Home() {
    // FORCE UPDATE
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    // NAVIGATE
    const navigate = useNavigate();

    // DATA
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');

    // STATE HANDLER FOR ID
    const [deleteID, setDeleteID] = useState('');
    const [updateID, setUpdateID] = useState([]);

    // FUNCTION FOR DATA POPULATE
    const [users, setUsers] = useState([]);

    const getData = async (setUsers) => {
        try {
            const res = await api.get("/api/users");

            const data = res.data;
            setUsers(data);
            console.log("Data Successfully Logged!");
        } catch (err) {
            console.log("getData not workeng", err);
        }
    };

    useEffect(() => {
        getData(setUsers);
    }, []);


    // SELECTOR
    function select(userss) {

        // SELECT ID FOR DELETE
        setDeleteID(userss._id)
        console.log(userss)

        // SELECT USER FOR UPDATE
        setState(true)
        setUpdateID(userss._id)
        setFirstName(userss.firstName)
        setLastName(userss.lastName)
        setEmail(userss.email)
        setGender(userss.gender)
        setStatus(userss.status)
        console.warn("Button 1", userss)
    }

    // UPDATE
    const updateMe = async (e) => {
e.preventDefault()
await fetch(`https://user-management-server.up.railway.app/api/users/${updateID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "gender": gender,
                "status": status

            })
        })
await getData(setUsers)

    }

    // UPDATE BUTTON STATE
    const [state, setState] = useState();
    const handleChange = () => {

        setState(false)

    }

    // DELETE BUTTON
    const deleteme = async() => {

        try {
            const response = await api.delete(`/api/users/${deleteID}`);

        } catch (err) {
            console.log(err);
        }
    
        await getData(setUsers)

    }

    return (
        // HEADER //
        <div className='container-fluid bg vh-100 pt-4 d-flex justify-content-center align-items-start'>
            <div className=' text-center mb-4'>
                <div className=' bg-primary  p-1 rounded-3 mb-4'>
                    <h1> USER MANAGEMENT </h1>
                </div>

                {/* ADD USER JSX UI */}
                <ADD getData={()=>getData(setUsers)}/>

                {/* DELETE BUTTON*/}
                <div className="modal fade" id="delete" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete ?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button onClick={deleteme} className="btn btn-primary" data-bs-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* UPDATE BUTTON*/}
                <div className=''>
                    <div className="modal fade" id="update_user" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form onSubmit={updateMe} id='update_user'>
                                    <div className="modal-body">
                                        <div className='container-fluid'>

                                            <div className='row'>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="firstname" className="form-label">FirstName:</label>
                                                    <input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} onInput={handleChange} placeholder={firstName} className="form-control" id="input-firstname" required />
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="lastname" className="form-label">Lastname:</label>
                                                    <input type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} onInput={handleChange} placeholder={lastName} className="form-control" id="input-lastname" required />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email address:</label>
                                                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} onInput={handleChange} placeholder={email} className="form-control" id="input-email" required />
                                            </div>
                                            <div className='row'>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="gender" value="Male" onChange={(e) => { setGender(e.target.value) }} required />
                                                        <label className="form-check-label">M</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="gender" value="Female" onChange={(e) => { setGender(e.target.value) }} required />
                                                        <label className="form-check-label">F</label>
                                                    </div>
                                            </div>
                                                <div className="mb-3 col-md-6">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="status" value="Active" onChange={(e) => { setStatus(e.target.value) }} required />
                                                        <label className="form-check-label" >Active</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="status" value="Inactive" onChange={(e) => { setStatus(e.target.value) }} required />
                                                        <label className="form-check-label">Inactive</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="modal-footer form-group">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" disabled={state} >Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className='form mx-auto'>
                    <table className='table table-hover'>
                        <thead className='thead-dark text-light'>
                            <tr>
                                <th>ID #</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Email</th>
                                    <th>Gender</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {users.map((userss, index) => {
                                return (
                                    // eslint-disable-next-line react/jsx-key
                                    <tr key={userss._id}>
                                        <td>{index + 1}</td>
                                        <td>{userss.firstName}</td>
                                        <td>{userss.lastName}</td>
                                        <td>{userss.email}</td>
                                        <td>{userss.gender}</td>
                                        <td>{userss.status}</td>
                                        <td className='d-flex justify-content-around'>
                                            <a href='#' className='edit' data-bs-toggle="modal" data-bs-target="#update_user" onClick={() => select(userss)}>
                                                <span><i className="lni lni-pencil-alt"></i></span>
                                            </a>
                                            <a href='#' id="1" className='remove' onClick={() => select(userss)} data-bs-toggle="modal" data-bs-target="#delete"  >

                                                <span><i className="lni lni-close"></i></span>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }
                            )}
                            {/* <Axioss/> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default Home;

