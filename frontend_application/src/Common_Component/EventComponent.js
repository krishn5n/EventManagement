import React, { useState } from "react";
import EnlargedEventComponent from './EnlargedEventComponent';
import '../CSS/EventComponent.css'
import Confirmtocancel from "../Admin_Components/Confirmtocancel";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Props will hold the URL for the Image, the Title of the Event, Description of the event
export default function EventComponent(props) {

    const navigate = useNavigate();
    useEffect(() => {
        let savedToken = localStorage.getItem('jwtToken');
        if (savedToken) {
            props.setjwt(savedToken);
        }
        else {
            props.setjwt('');;
            navigate("/notauthenticated");
        }
    }, []);


    const eventobj = {
        'title': props.title,
        'imgurl': props.imgurl,
        'descslice': props.desc.slice(0, 140),
        'clubname': props.clubname,
        'desc': props.desc,
        'stime': props.stime.slice(0, -5),
        'sdate': props.sdate.split('-').reverse().join('-'),
        'etime': props.etime.slice(0, -5),
        'edate': props.edate.split('-').reverse().join('-'),
        'ecloseregtime': props.ecloseregtime.slice(0, -5),
        'ecloseregdate': props.ecloseregdate.split('-').reverse().join('-'),
        'payment': props.payment,
        'location': props.location
    }



    const [enlarge, toenlarge] = useState(false);
    const [confirmopen, toconfirm] = useState(false);

    const openenlarge = () => {
        toenlarge(true);
    }

    const closeenlarge = () => {
        toenlarge(false);
    }

    const openconfirmation = () => {
        toconfirm(true);
    }

    const closeconfirmation = () => {
        toconfirm(false);
    }

    return (
        <div className='outside-cont'>
            <div className="image-cont">
                <img src={eventobj.imgurl} className='image' alt="Event" />
            </div>
            <div className="text-cont">
                <div className="title-cont">
                    <p>{eventobj.title}</p>
                </div>
                <div className="desc-cont">
                    <p className='desc'>{eventobj.descslice + '...'}</p>
                </div>
                <div className="but-cont">
                    <button type="button" className="btn btn-primary" onClick={openenlarge}>More Info/Register</button>
                    {props.usermode === 'admin' && <button type="button" onClick={openconfirmation} className="btn btn-danger">Danger</button>}
                </div>
            </div>
            {enlarge && <EnlargedEventComponent jwt={props.jwt} setjwt={props.setjwt} onclose={closeenlarge} eventobj={eventobj} />}
            {confirmopen && <Confirmtocancel deletedobj={props.deletedobj} setdeleted={props.setdeleted} jwt={props.jwt} setjwt={props.setjwt} eventobj={eventobj} onclose={closeconfirmation} />}
        </div>
    )

}


