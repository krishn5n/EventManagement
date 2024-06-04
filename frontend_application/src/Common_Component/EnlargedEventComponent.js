import React, { useEffect } from "react";
import '../CSS/EnlargedEventComponent.css'
import { useNavigate } from "react-router-dom";



export default function EnlargedEventComponent(props) {

    const navigate = useNavigate();
    console.log(typeof (props.jwt));

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

    let eventobj = props.eventobj;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="imagecontent">
                    <img src={eventobj.imgurl} alt="This is the title" className="modal-img" />
                </div>
                <div className="infocontent">
                    <button className="close-button" onClick={props.onclose}>X</button>
                    <div className="clubdetails">
                        <div className="clubname">
                            <h3>{eventobj.clubname}</h3>
                        </div>
                        <div className="clubpic">
                            <img alt="" src="https://cdn.pixabay.com/photo/2016/06/09/20/38/woman-1446557_640.jpg" className="clubimg" />
                        </div>
                    </div>
                    <div className="eventname">
                        <h2>{eventobj.title}</h2>
                    </div>
                    <div className="eventdesc">
                        <p className="eventdesctext">
                            {eventobj.desc}
                        </p>
                    </div>
                    <div className="additionaldata">
                        <p>From :- {eventobj.stime} , {eventobj.sdate}</p>
                        <p>End :- {eventobj.etime}, {eventobj.edate}</p>
                        <p>At :- {eventobj.location}</p>
                        <p>Final time and date to register is {eventobj.ecloseregtime}, {eventobj.ecloseregdate} </p>
                        <p>Cost of Payment thus is {eventobj.payment}</p>
                    </div>
                    <button type="button" className="btn btn-primary">Attend</button>
                </div>
            </div>
        </div>
    );
}
