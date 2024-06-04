import React, { useState } from 'react';
import '../CSS/Usersignin.css'
import { useNavigate } from 'react-router-dom';



export default function Usersignin(props) {
    console.log(props);
    const [name, setname] = useState('');
    const [regno, setregno] = useState(0);
    const [email, setemail] = useState('');
    const [dob, setdob] = useState(new Date());
    const [password, setpasswd] = useState('');
    const navigate = useNavigate();

    const changename = (event) => {
        setname(event.target.value);
    }
    const changeregno = (event) => {
        setregno(event.target.value);
    }
    const changeemail = (event) => {
        setemail(event.target.value);
    }
    const changedob = (event) => {
        setdob(event.target.value);
    }
    const changepassword = (event) => {
        setpasswd(event.target.value);
    }

    const handlesubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8000/userid'
        const data = {
            Regno: regno,
            Name: name,
            Email: email,
            Dob: dob,
            Password: password
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json'
                },
                body: JSON.stringify(data)
            });
            const obt = await response.json();
            const conf = document.getElementById('confirm');
            if (response.status === 200) {
                props.setjwt(obt.jwt)
                localStorage.setItem('jwtToken', props.jwt);
                const propstosend = {
                    usermode: obt.usermode
                };
                navigate("/Homeforuser", { state: propstosend });
                console.log(obt);
                conf.textContent = 'Data has been successfully added';
            }
            else {
                conf.textContent = obt.Message;
            }
        }
        catch (error) {
            console.log("Error has occured with attributes ", error);
        }

    }

    return (
        <>
            <div className="container">
                <h1>
                    Sign-Up
                </h1>
                <form onSubmit={handlesubmit}>
                    <div className="row mgnleft350 g-3 align-items-center">
                        <div className="col-auto">
                            <label className="col-form-label">Identification:</label>
                        </div>
                        <div className="col-auto">
                            <input type="number" value={regno} onInput={changeregno} className="idip ipbox form-control" aria-describedby="passwordHelpInline" />
                        </div>
                        <div className="col-auto idtext">
                            <span id="passwordHelpInline" className="form-text">
                                Must be an integer.
                            </span>
                        </div>
                    </div>
                    <br />
                    <div className="row mgnleft350 g-3 align-items-center">
                        <div className="col-auto">
                            <label className="col-form-label">Name:</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" value={name} onInput={changename} className="ipbox form-control nameip" aria-describedby="passwordHelpInline" />
                        </div>
                        <div className="col-auto nametext">
                            <span id="passwordHelpInline" className="form-text">
                                Must be at least 8 characters long.
                            </span>
                        </div>
                    </div>
                    <br />
                    <div className="row mgnleft350 g-3 align-items-center">
                        <div className="col-auto">
                            <label className="col-form-label">Email:</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" value={email} onInput={changeemail} className="ipbox form-control emailip" aria-describedby="passwordHelpInline" />
                        </div>
                        <div className="col-auto emailtext">
                            <span id="passwordHelpInline" className="form-text">
                                Must be of gmail or yahoo.com
                            </span>
                        </div>
                    </div>
                    <br />
                    <div className="row mgnleft350 g-3 align-items-center">
                        <div className="col-auto">
                            <label className="col-form-label">Date of Birth:</label>
                        </div>
                        <div className="col-auto">
                            <input type="date" value={dob} onInput={changedob} className="ipbox dateip form-control" aria-describedby="passwordHelpInline" />
                        </div>
                    </div>
                    <br />
                    <div className="row mgnleft350 g-3 align-items-center">
                        <div className="col-auto">
                            <label className="col-form-label">Password:</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" value={password} onInput={changepassword} className="passip ipbox form-control" aria-describedby="passwordHelpInline" />
                        </div>
                        <div className="col-auto longtext passtext">
                            <span id="passwordHelpInline" className="form-text">
                                Must contain at least 1 lower case, 1 upper case, 1 special character and 1 number.
                            </span>
                        </div>
                    </div>
                    <br />
                    <button type="button" onClick={handlesubmit} className="btn btn-primary submit">Submit</button>
                    <br />
                </form>
            </div>
        </>
    )
}


