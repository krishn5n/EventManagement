import React from "react";
import { useNavigate } from "react-router-dom";

export default function Userprofile(props) {
    const navigate = useNavigate();
    const signout = () => {
        localStorage.removeItem('jwtToken');
        navigate('/');
    }

    return (
        <>
            <h1>
                PROFILE PAGE
            </h1>
            <button type="button" onClick={signout} className="btn btn-danger">Sign-Out</button>
        </>
    )
}