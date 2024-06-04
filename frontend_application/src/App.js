import Usersignin from './User_Components/Usersignin';
import Usersignup from './User_Components/Usersingup';
import './App.css';
import Layout from './Common_Component/Layout';
import React, { useState } from 'react';
import Homeforuser from './User_Components/Homeforuser';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notauthenticated from './Common_Component/Notauthenticated';
import Userprofile from './User_Components/Userprofile';
import HomeforClub from './Club_Component/HomeforClub';

function App() {
  const [jwt, setjwt] = useState('');
  const [usermode, setusermode] = useState('');

  return (

    <Router>
      <Layout jwt={jwt} setjwt={setjwt}>
        <Routes>
          <Route path="/" element={<Usersignup usemode={usermode} setusermode={setusermode} jwt={jwt} setjwt={setjwt} />} />
          <Route path="/signup" element={<Usersignin usemode={usermode} setusermode={setusermode} jwt={jwt} setjwt={setjwt} />} />
          <Route path='/Homeforuser' element={<Homeforuser usemode={usermode} setusermode={setusermode} jwt={jwt} setjwt={setjwt} />} />
          <Route path='/notauthenticated' element={<Notauthenticated jwt={jwt} setjwt={setjwt} />} />
          <Route path='/userprofile' element={<Userprofile usemode={usermode} setusermode={setusermode} />} />
          <Route path='/Homeforclub' element={<HomeforClub usemode={usermode} setusermode={setusermode} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
