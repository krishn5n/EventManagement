import React from "react";
import '../CSS/Confirmtocanccel.css';


export default function Confirmtocancel(props) {
    let eventobj = props.eventobj;


    const deleteevent = async () => {
        console.log('Delete event comenses');
        const url = 'http://localhost:8000/deleteevent';
        const url1 = 'http://localhost:8000/addtodelete';
        const url2 = 'https://localhost:8000/addevent';

        try {

            const obj = {
                Eventname: eventobj.title,
                Clubname: eventobj.clubname,
                Location: eventobj.location
            }
            const delobj = {
                Eventname: eventobj.title,
                Eventstart: eventobj.sdate.split('-').reverse().join('-') + 'T' + eventobj.stime,
                Clubname: eventobj.clubname,
                Eventdesc: eventobj.desc,
                Eventenddate: eventobj.edate.split('-').reverse().join('-') + 'T' + eventobj.etime,
                Eventclosereg: eventobj.ecloseregdate.split('-').reverse().join('-') + 'T' + eventobj.ecloseregtime,
                Eventloc: eventobj.location,
                Eventimg: eventobj.imgurl,
                payment: eventobj.payment

            }
            let arr = props.deletedobj;




            //Adding to temperory event deletion
            const response2 = await fetch(url1, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(delobj)
            })
            if (response2.status === 200) {
                console.log('Addition to temp deleted is complete');
            }


            /*
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(obj)
            });
            if (response.status === 200) {
                console.log('Deletion is complete');
            }
            const resobj = response.json();
            */
            props.onclose();
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="modal-overlays">
                <div className="modal-contents">
                    <button className="close-button" onClick={props.onclose}>X</button>
                    <div className="Headline">
                        <h2>
                            Confirmation for cancellation of event!!
                        </h2>
                    </div>
                    <div className="Eventdetails-cancel">
                        <p>Event Name - {eventobj.title}</p>
                        <p>Club Name - {eventobj.clubname}</p>
                        <p>From :- {eventobj.stime} , {eventobj.sdate}</p>
                        <p>End :- {eventobj.etime}, {eventobj.edate}</p>
                        <p>Final time and date to register is</p>
                        <p>{eventobj.ecloseregtime}, {eventobj.ecloseregdate} </p>
                        <p>Cost of Payment thus is {eventobj.payment}</p>
                        <p>Location :- {eventobj.location}</p>
                        <button type="button" className="btn btn-danger" onClick={deleteevent}>Delete Event</button>
                    </div>
                    <div className="alert alert-danger" role="alert">
                        A simple danger alert—check it out!
                    </div>
                </div>
            </div>
        </>
    )
}











