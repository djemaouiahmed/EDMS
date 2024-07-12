
import Uploadpage from './User/Uploadpage';
import HomePage from './User/HomePage';

import RootLayout from './User/RootLayout';
import DownloadPage from './User/Download';

import RegisterPage from './login_register/register';
import { RouterProvider, createBrowserRouter, Route,createRoutesFromElements, Navigate, Outlet, Routes } from 'react-router-dom';
import LoginPage from './login_register/loginPage';

import SearchPage from './User/SearchPage';
import {  useState } from 'react';
import AdminPage from './adminPage/adminPage';
import AdminSideMenu from './adminPage/adminSideMenu';
import VerifyDoc from './User/VerifyDoc';
import DiffusePage from './User/Diffuse';
import AcceptedUsrTbl from './adminPage/accesptedUsrTbl';
import BasicTable from './adminPage/unverifiedUsrTbl';
function App() {
 
 const [roles, setRoles] = useState(null);
  
  const  handleLog = (isLogged) => {

   
    
    localStorage.setItem("isAuthenticated", isLogged);
   if (localStorage.getItem("isAuthenticated") === "true") {
    window.location.href = "/Dashboard";
   
    }
 
} 


  const ProtectedRoutes = ({ isAuthenticated }) => {
   
    return isAuthenticated === "true" ? <Outlet />   : <Navigate to="/login"  />;
  };


  const Protectedlog = ({ Authenticated }) => {
  
    return Authenticated === null || Authenticated === "false" ? <Outlet /> : <Navigate to="/" />;
  };
  async function ProtectedRole() {
    const response = await fetch('http://localhost:3000/admin', {
      method: 'GET',
   
      credentials: 'include'
    });

  try {
 
    const results = await response.json();
    setRoles(results);
  return results;
  
   
    return results;} catch (error) {
      console.error('Error:', error);
    }
  }
  
  const Protectedadmin = ({ AuthenticatedasAdmin }) => {

    AuthenticatedasAdmin = roles
    if (AuthenticatedasAdmin === null) {
      return false
    }
    return AuthenticatedasAdmin === "admin" ? <Outlet />: <Navigate to="/" /> ;
  };
  const ProtectedResponsable = ({ AuthenticatedasRes }) => {
  
    AuthenticatedasRes = roles
    if (AuthenticatedasRes === null) {
      return false
    }
    
        return AuthenticatedasRes === "responsable" ? <Outlet />: <Navigate to="/" />;
      };
      const ProtectedUser = ({ AuthenticatedasUsr }) => {
        AuthenticatedasUsr = roles
  if (AuthenticatedasUsr === null) {
    return false
  }
     
     
            return (AuthenticatedasUsr === "User" || AuthenticatedasUsr === "responsable") ? <Outlet /> : <Navigate to="/" />;
          };
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
       <Route element={<Protectedlog Authenticated={localStorage.getItem("isAuthenticated")} />}>
        <Route path="/login" element={<LoginPage isLogged={handleLog} />} />
        <Route path="/register" element={<RegisterPage/>} />
        </Route>

        <Route element={<ProtectedRoutes isAuthenticated={localStorage.getItem("isAuthenticated")} />}>
       
        <Route path = "/" element = {<RootLayout roles={roles}/>}>
           <Route element={<ProtectedUser AuthenticatedasUsr={ProtectedRole()} />}>
        
          <Route index element={<HomePage />} />
         
          <Route path="Mydocuments" element={<Uploadpage />}>
            <Route index element={<Uploadpage />} />
          </Route>
          <Route path="diffuse" element={<DiffusePage />} />
          <Route path="download" element={<DownloadPage />} />
          <Route path="Search" element={<SearchPage />} />
          <Route element={<ProtectedResponsable AuthenticatedasRes={ProtectedRole()} />}>
        <Route path = "verify" element={<VerifyDoc/>}/>
        </Route>
        
          </Route>
          
            <Route element={<Protectedadmin AuthenticatedasAdmin={ProtectedRole()} />}>
              
                      <Route index path = "Dashboard" element={<AdminPage/>}/>
                  <Route path = "unverifiedTab" element={<BasicTable/>}/>
                      <Route  path = "ModTab" element={<AcceptedUsrTbl/>}/>
  
                      </Route>
          
          </Route>
        </Route>
        </>
    )
    //className=' bg-nightbg  '
  );
  return (
<body  >
<RouterProvider router={router} /></body>
)
}

export default App;
