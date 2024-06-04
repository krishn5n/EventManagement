import React from "react";
import { useState } from "react";
import '../CSS/FormforEvent.css';

export default function FormforEvent(props) {
    const [draggedFile, setDraggedFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [enlarge, setenlarge] = useState(false);
    const [obj, setobj] = useState({ ename: '', cname: '', sdate: new Date().toISOString().split('T')[0], stime: new Date().toISOString().split('T')[1].slice(0, -8), edate: new Date().toISOString().split('T')[0], etime: new Date().toISOString().split('T')[1].slice(0, -8), regdate: new Date().toISOString().split('T')[0], regtime: new Date().toISOString().split('T')[1].slice(0, -8), loc: '', desc: '', imgurl: (selectedFile || draggedFile) ? (selectedFile || draggedFile).name : '' });

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDraggedFile(event.dataTransfer.files[0]);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const renderPreview = () => {
        if (draggedFile) {
            return <img src={URL.createObjectURL(draggedFile)} alt="Dropped" />;
        } else if (selectedFile) {
            return <img src={URL.createObjectURL(selectedFile)} alt="Selected" />;
        } else {
            return <p>Drag and drop an image here or click to select a file</p>;
        }
    };

    const handlesubmit = (event) => {
        event.preventDefault();
        console.log(obj);

    }

    const changeval = (event) => {
        setobj((prevObj) => ({
            ...prevObj,
            [event.target.name]: event.target.value,
        }));
    }

    const changelarge = () => {
        enlarge === true ? setenlarge(false) : setenlarge(true);
    }

    return (
        <div className="container">
            <h1>
                Create a New Event
            </h1>
            <form onSubmit={handlesubmit}>
                <div className="outside-event-info">
                    <div className="event-info">
                        <label className="col-form-label enamelabel">Event Name:</label>
                        <input type="text" value={obj.ename} name="ename" onChange={changeval} className="ename ipbox form-control" aria-describedby="passwordHelpInline" />
                    </div>
                    <div className="event-info holderofevent">
                        <div className="event-info-inside">
                            <label className="col-form-label enamelabel">Club Name:</label>
                            <input type="text" value={obj.cname} name="cname" onChange={changeval} className="ename miniip ipbox form-control" aria-describedby="passwordHelpInline" />
                        </div>
                        <div className="event-info-inside">
                            <label className="col-form-label enamelabel">Event Date</label>
                            <input type="date" value={obj.sdate} name="sdate" onChange={changeval} className="ename ipbox form-control date-time" aria-describedby="passwordHelpInline" />
                        </div>
                        <div className="event-info-inside">
                            <label className="col-form-label enamelabel">Event Time </label>
                            <input type="time" value={obj.stime} name="stime" onChange={changeval} className="ename ipbox form-control date-time" aria-describedby="passwordHelpInline" />
                        </div>
                    </div>
                    <div className="event-info holderofevent">
                        <div className="event-info-inside">
                            <label className="col-form-label enamelabel">Event End Date:</label>
                            <input type="date" value={obj.edate} name="edate" onChange={changeval} className="ename date-time ipbox form-control" aria-describedby="passwordHelpInline" />
                        </div>
                        <div className="event-info-inside">
                            <label className="col-form-label enamelabel">Event End Time</label>
                            <input type="time" value={obj.etime} name="time" onChange={changeval} className="ename ipbox form-control date-time" aria-describedby="passwordHelpInline" />
                        </div>
                        <div className="event-info-inside">
                            <label className="col-form-label enamelabel">Registeration Closing Date </label>
                            <input type="date" value={obj.regdate} name="regdate" onChange={changeval} className="ename ipbox form-control date-time" aria-describedby="passwordHelpInline" />
                        </div>
                        <div className="event-info-inside">
                            <label className="col-form-label enamelabel">Registeration Closing Time </label>
                            <input type="time" value={obj.regtime} name="regtime" onChange={changeval} className="ename ipbox form-control date-time" aria-describedby="passwordHelpInline" />
                        </div>
                    </div>
                    <div className="event-info">
                        <label className="col-form-label enamelabel">Event Location</label>
                        <input type="text" value={obj.loc} name="loc" onChange={changeval} className="ename ipbox form-control" aria-describedby="passwordHelpInline" />
                    </div>
                    <div className="event-info">
                        <label className="col-form-label enamelabel">Event Description</label>
                        <textarea value={obj.desc} name="desc" onChange={changeval} rows={8} cols={100} />
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary image-but-club" onClick={changelarge}>Event Image</button>
                        <p className="status-img-chosen">{(selectedFile || draggedFile) ? (selectedFile || draggedFile).name : 'No File Chosen'}</p>
                    </div>
                    {enlarge &&
                        <div className="modal-overlay">
                            <div className="addition-image-slide">
                                <input type="file" className="filehandler" onChange={handleFileChange} />
                                <button type="button" className="btn btn-primary" onClick={changelarge}>Submit</button>
                            </div>
                        </div>
                    }
                </div>
                <br />
                <button type="button" className="btn btn-primary submit" onClick={handlesubmit}>Submit</button>
                <br />
            </form>
        </div>
    )
}