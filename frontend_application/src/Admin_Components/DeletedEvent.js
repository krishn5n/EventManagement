import React, { useEffect } from "react";
import DeleteComponent from "./DeleteComponent";


export default function DeletedEvent(props) {
    return (
        <div className="container">
            <h1>
                Deleted Events
            </h1>
            <div className='row specifymargin'>
                {props.deletedobj.map((element) => (
                    <div className="col-md-3" key={element.Eventname}>
                        <DeleteComponent deletedobj={props.deletedobj} obj={element} />
                    </div>
                ))}
            </div>
        </div>
    )
}