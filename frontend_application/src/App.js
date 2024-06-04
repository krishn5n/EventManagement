import Usersignin from './User_Components/Usersignin';
import Usersignup from './User_Components/Usersingup';
import './App.css';
import Layout from './Common_Component/Layout';
import React, { useState } from 'react';
import Homeforuser from './User_Components/Homeforuser';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notauthenticated from './Common_Component/Notauthenticated';
import Userprofile from './User_Components/Userprofile';

function App() {
  const [jwt, setjwt] = useState('');
  return (

    <Router>
      <Layout jwt={jwt} setjwt={setjwt}>
        <Routes>
          <Route path="/" element={<Usersignup jwt={jwt} setjwt={setjwt} />} />
          <Route path="/signup" element={<Usersignin jwt={jwt} setjwt={setjwt} />} />
          <Route path='/Homeforuser' element={<Homeforuser jwt={jwt} setjwt={setjwt} />} />
          <Route path='/notauthenticated' element={<Notauthenticated />} />
          <Route path='/userprofile' element={<Userprofile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
