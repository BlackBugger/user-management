/* eslint-disable */
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { api } from '../../frontend/api/api';

const api = axios.create({
    baseURL: "https://user-management-server.up.railway.app/",
    Accept: "application/json",
});

const add_user = (props) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const submit = async (event) => {
        event.preventDefault();
        const body = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            gender: gender,
            status: status
        }

        const response = await api.post('/api/users', body)


        console.log('form submitted ✅');
        await props.getData()


    }
    const handleSubmit = event => {

    };

    return (
        <div className=''>
            <button type='button' className='btn btn-primary p-1 fs-6 mb-4' data-bs-toggle="modal" data-bs-target="#exampleModal">New User</button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Register!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={submit}>
                            <div className="modal-body">
                                <div className='container-fluid'>

                                    <div className='row'>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="firstname" className="form-label">First Name:</label>
                                            <input type="text" name='firstName' className="form-control" id="input-firstname" onChange={e => setFirstname(e.target.value)} />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="lastname" className="form-label">Last Name:</label>
                                            <input type="text" name='lastName' className="form-control" id="input-lastname" onChange={e => setLastname(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address:</label>
                                        <input type="email" name='email' className="form-control" id="input-email" onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div className='row'>
                                        <div className="mb-3 col-md-6">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="Male" onClick={() => setGender('Male')} />
                                                <label className="form-check-label" htmlFor="inlineRadio1">M</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="Female" onClick={() => setGender('Female')} />
                                                <label className="form-check-label" htmlFor="inlineRadio2">F</label>
                                            </div>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="status" id="active" value="Active" onClick={() => setStatus('Active')} />
                                                <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="status" id="inactive" value="Inactive" onClick={() => setStatus('inactive')} />
                                                <label className="form-check-label" htmlFor="inlineRadio2">Inactive</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="modal-footer form-group">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default add_user