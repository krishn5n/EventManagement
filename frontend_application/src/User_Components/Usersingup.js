import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Usersignup.css'

export default function Usersignup(props) {
    const [passwd, setpasswd] = useState('');
    const [uservalid, setuser] = useState('');
    const [displayofwrong, setdisplay] = useState('none');
    const navigate = useNavigate();
    const changeuser = (event) => {
        setdisplay('none');
        setuser(event.target.value);
    }

    const changepasswd = (event) => {
        setdisplay('none');
        setpasswd(event.target.value);
    }

    const handlesubmit = async (event) => {
        console.log(`trying to log in with values ${uservalid} and ${passwd}`);
        event.preventDefault();
        const url = 'http://localhost:8000/login';
        const data = {
            Userinfo: uservalid,
            Password: passwd
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const value = await response.json();
            //Usermode thus sent from response tag. 
            if (response.status === 200) {
                props.setusermode(value.usermode)
                props.setjwt(value.jwt);
                console.log('Usermode at sign up is ' + props.usermode);
                localStorage.setItem('jwtToken', value.jwt);

                const propstosend = {
                    Clubdetails: value.Clubdetail,
                    usermode: value.usermode
                }

                if (props.usermode === 'Club') {
                    navigate('/Homeforclub', { state: propstosend })
                }
                console.log('Correct information');
                navigate("/Homeforuser", { state: propstosend });
            }
            else {
                console.log(passwd);
                console.log(uservalid);
                console.log(value.Message);
                setdisplay('block');
                //alert("Wrong credentials");
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className='container-sm'>
                <div className="heading-container">
                    <h1>Sign-In</h1>
                </div>
                <div className="container">
                    <form onSubmit={handlesubmit}>
                        <div className="row mgnleft350 g-3 align-items-center">
                            <div className="col-auto">
                                <label className="col-form-label">Name/Email :</label>
                            </div>
                            <div className="col-auto">
                                <input type="text" id="id" value={uservalid} onInput={changeuser} className="form-control" aria-describedby="passwordHelpInline" />
                            </div>
                            <div className="col-auto">
                                <span id="passwordHelpInline" className="form-text">
                                    Must be 8-20 characters long.
                                </span>
                            </div>
                        </div>
                        <br />
                        <div className="row mgnleft350 g-3 align-items-center">
                            <div className="col-auto">
                                <label className="col-form-label">Password</label>
                            </div>
                            <div className="col-auto">
                                <input type="password" id="inputPassword6" value={passwd} onInput={changepasswd} className="form-control password-ip-signin" aria-describedby="passwordHelpInline" />
                            </div>
                            <div className="col-auto">
                                <span id="passwordHelpInline" className="form-text">
                                    Must be 8-20 characters long.
                                </span>
                            </div>
                        </div>
                        <div className='hidden-wrong-pop-up' style={{ display: displayofwrong }}>
                            <p className='text-for-wrong-pop-up'>
                                Your Username or Password is wrong.
                            </p>
                        </div>

                        <button type="button" onClick={handlesubmit} className="btn btn-primary submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}



