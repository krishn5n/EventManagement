import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Layout.css'

function Layout({ children, jwt = '', setjwt = '' }, props) {
    const navigate = useNavigate();


    const gotosignin = () => {
        navigate("/");
    }
    const gotosignup = () => {
        navigate("/signup")
    }

    const gotosignout = () => {
        navigate('/userprofile');
    }

    return (
        <div className='heading'>
            <nav className="navbar" >
                <div className="container-fluid">
                    <p className='titlename'>VIT Chennai</p>
                    <div className='buts'>
                        {jwt === '' && <button type="button" className="btn leftbtn btn-outline-primary" onClick={gotosignin} >Sign-in</button>}
                        {jwt === '' && <button type="button" className="btn btn-outline-primary" onClick={gotosignup} >Sign-up</button>}
                        {jwt !== '' && <button type="button" className="btn btn-outline-primary" onClick={gotosignout} >Profile</button>}

                    </div>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </div >
    );
}

export default Layout;


