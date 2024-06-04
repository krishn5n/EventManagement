import React, { useEffect, useState } from "react";
import ClubsEventComponent from "./ClubsEventComponent";

export default function ClubEventCollection(props) {
    const [event, setevent] = useState([1, 2, 3]);


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch('http://localhost8000/clubevents', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: {
                        clubName: props.cname
                    }
                })
                const resobj = response.json;
                if (response.json === 200) {
                    setevent(resobj['Result']);
                }
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchdata();
    }, [])

    if (event.length === 0) {
        return (
            <>
                Loading
            </>
        )
    }


    return (
        <>
            <div>
                <h1>Registered Event</h1>
            </div>
            <div>
                {event.map((element) => (
                    <div key={element}>
                        <ClubsEventComponent event={element} />
                    </div>
                ))}
            </div>
        </>
    );
}
