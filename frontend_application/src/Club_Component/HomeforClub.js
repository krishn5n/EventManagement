
import React from "react";
import FormforEvent from "./FormforEvent";
import ClubEventCollection from "./ClubEventCollection";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function HomeforClub(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    useEffect(() => {
        let savedToken = localStorage.getItem('jwtToken');
        if (!savedToken) {
            props.setjwt('');;
            navigate("/notauthenticated");
        }
        if (!data || data.usermode != 'Club') {
            navigate("/notauthenticated");
        }
    }, [navigate, data, props]);


    return (
        <>
            <FormforEvent Clubdetails={data && data.Clubdetails} />
            <ClubEventCollection Clubdetails={data && data.Clubdetails} />
        </>
    )
}

/*


                    <div>
                        <div onDragOver={handleDragOver} onDrop={handleDrop} style={{ border: '2px dashed gray', padding: '20px' }}>
                            {renderPreview()}
                        </div>
                        <input type="file" onChange={handleFileChange} />
                    </div>


*/


