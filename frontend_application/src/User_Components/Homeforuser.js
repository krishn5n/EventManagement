import React, { useEffect, useState } from 'react'
import Slideshow from '../Common_Component/Slideshow'
import EventCollection from '../Common_Component/EventCollection';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import DeletedEvent from '../Admin_Components/DeletedEvent'

export default function Homeforuser(props) {
    const [deletedobj, setdeleted] = useState([]);
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        let savedToken = localStorage.getItem('jwtToken');
        if (!savedToken) {
            props.setjwt('');;
            navigate("/notauthenticated");
        }
    }, []);

    return (
        <div>
            <Slideshow setjwt={props.setjwt} jwt={props.jwt} />
            {data.usermode === 'admin' && < DeletedEvent deletedobj={deletedobj} setdeleted={setdeleted} />}
            <EventCollection deletedobj={deletedobj} setdeleted={setdeleted} usermode={data && data.usermode} setjwt={props.setjwt} jwt={props.jwt} />
        </div>
    )
}
