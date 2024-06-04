import React from "react";

export default function Notauthenticated(props) {

    localStorage.removeItem('jwtToken');

    return (
        <>
            <div className="complete-div-notautenticated">
                <h1>
                    User is not Authenticated to Enter. Please signin again.
                </h1>
            </div>
        </>
    )
}