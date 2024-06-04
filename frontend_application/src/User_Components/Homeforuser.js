import React, { useEffect, useState } from 'react'
import Slideshow from '../Common_Component/Slideshow'
import EventCollection from '../Common_Component/EventCollection';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import DeletedEvent from '../Admin_Components/DeletedEvent'

export default function Homeforuser(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [deletedobj, setdeleted] = useState([]);
    const data = location.state;

    console.log('usermode is' + data.usermode)

    useEffect(async () => {
        if (data.usermode === 'Clubs') {
            navigate("/notauthenticated");
        }
        let savedToken = localStorage.getItem('jwtToken');
        try {
            let response = await fetch('http://localhost:8000/')
        }
        catch (err) {
            navigate("/notauthenticated");
        }

        if (!savedToken) {
            navigate("/notauthenticated");
        }
    }, [])


    return (
        <div>
            <Slideshow setjwt={props.setjwt} jwt={props.jwt} />
            {props.usermode === 'admin' && < DeletedEvent deletedobj={deletedobj} setdeleted={setdeleted} />}
            <EventCollection deletedobj={deletedobj} setdeleted={setdeleted} usermode={props.usermode} setjwt={props.setjwt} jwt={props.jwt} />
        </div>
    )

}
