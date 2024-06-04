import React from 'react'
import '../CSS/Eventcollection.css'
import EventComponent from './EventComponent';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



export default function EventCollection(props) {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyjwt = async () => {
            const url = 'https://localhost:8000/checkjwt';
            try {
                const resposnse = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${props.jwt}`
                    }
                })
                if (resposnse.status === 401) {
                    props.setjwt('');
                }
            }
            catch (err) {
                props.setjwt('');
                navigate("/notauthenticated")
            }
        }
    }, [])


    useEffect(() => {
        const changejwt = () => {
            navigate("/notauthenticated")
        }
    }, [props.jwt]);


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const events = await setupEvents();
                setEvents(events);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchEvents();
    }, []);

    const setupEvents = async () => {
        const url = 'http://localhost:8000/allevents';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${props.jwt}`
                },
            });
            const resobj = await response.json();

            if (response.status === 200) {
                return resobj;
            }
            else if (response.status === 401) {
                props.setjwt('');
                navigate("/notauthenticated");
            }
            else {
                console.log('Error is not working with status as not 200');
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='outside-container'>
            <h1 className='headingforevents'>Events</h1>
            <div className='row specifymargin'>
                {events.map((element) => (
                    <div className="col-md-3" key={element.Eventname}>
                        <EventComponent deletedobj={props.deletedobj} setdeleted={props.setdeleted} jwt={props.jwt} setjwt={props.setjwt} location={element.Eventloc} payment={element.payment} edate={element.Eventenddate.split('T')[0]} etime={element.Eventenddate.split('T')[1]} ecloseregtime={element.Eventclosereg.split('T')[1]} ecloseregdate={element.Eventclosereg.split('T')[0]} sdate={element.Eventstart.split('T')[0]} stime={element.Eventstart.split('T')[1]} usermode={props.usermode} title={element.Eventname} desc={element.Eventdesc} imgurl={element.Eventimg} clubname={element.Clubname} />
                    </div>
                ))}
            </div>
        </div>
    );
};


/*

export class EventCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }

    async componentDidMount() {
        const events = await this.setupevents();
        if (events) {
            this.setState({ events });
        }
    }

    async setupevents() {
        const url = 'http://localhost:8000/allevents';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const resobj = response.json();
            if (response.status === 200) {
                return resobj;
            }
            else {
                console.log('Error is not working with status as not 200');
            }
        } catch (err) {
            console.log(err);
        }
    }


    render() {
        const { events } = this.state;

        if (events.length === 0) {
            return <div>Loading...</div>; // or any loading indicator
        }



        return (
            <div className='outside-container'>
                <h1 className='headingforevents'>
                    Events
                </h1>
                <div className='row specifymargin'>
                    {
                        events.map((element) => {
                            return <div className="col-md-3" key={element.Eventname}>
                                <EventComponent title={element.Eventname} desc={element.Eventdesc} imgurl={element.Eventimg} clubname={element.Clubname} />
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default EventCollection


*/
