import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, FilePlus2, Search, Download, FileCheck2, LogOut, FileInput } from 'lucide-react';

const  RootLayout = ({ roles }) => {
const[active,setActive] = React.useState("Home")
function handleActive(link){
  setActive(link)
}

  async function logout() {
    const response = await fetch('http://localhost:3000/logout', {
      method: 'GET',
      credentials: 'include',
    });

    localStorage.removeItem("isAuthenticated");
    window.location.href = "/login";
  }

  return (
    <div className="flex h-screen w-full" >
      <div className="bg-gray-900 text-gray-200 transition-all duration-300 ">
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
          <a className="flex items-center gap-96 font-semibold" href="#">

       <span className=" flex "><img src='../../logo2.png' className='size-8 h-9'></img><p className="pt-2 ml-1">FileCompass</p></span>
          </a>
        </div>
        <nav className=" gap-96 px-4 py-6">
          <ul>
            <li className={` mb-2  rounded-md px-3 py-2 transition-colors hover:bg-gray-800 ${active==="Home"?"bg-gray-800 ":""} `} hidden={!(roles === "responsable" || roles === "User")}>
              <div className="flex items-center">
                <Home className="h-6 w-6 mr-2" />  
                <NavLink onClick={()=>handleActive("Home")} to="/" aria-current="page">Dashboard</NavLink>
              </div>
            </li>
            <li className={` mb-2  rounded-md px-3 py-2 transition-colors hover:bg-gray-800 ${active==="Mydocuments"?"bg-gray-800 ":""} `} hidden={!(roles === "responsable" || roles === "User")}>
              <div className="flex items-center"> 
                <FilePlus2 className="h-6 w-6 mr-2" />
                <NavLink onClick={()=>handleActive("Mydocuments")} to="Mydocuments">Upload doucments</NavLink>
              </div>
            </li>
            <li className={` mb-2  rounded-md px-3 py-2 transition-colors hover:bg-gray-800 ${active==="Search"?"bg-gray-800 ":""} `} hidden={!((roles === "responsable" || roles === "User"))}>
              <div className="flex items-center"> 
                <Search className="h-6 w-6 mr-2" />
                <NavLink onClick={()=>handleActive("Search")} to="Search">Search documents</NavLink>
              </div>
            </li>
            <li className={` mb-2  rounded-md px-3 py-2 transition-colors hover:bg-gray-800 ${active==="download"?"bg-gray-800 ":""} `} hidden={!((roles === "responsable" || roles === "User"))}>
              <div className="flex items-center"> 
                <Download className="h-6 w-6 mr-2" />
                <NavLink onClick={()=>handleActive("download")} to="download">Documents recieved</NavLink>
              </div>
            </li>
            <li className={` mb-2  rounded-md px-3 py-2 transition-colors hover:bg-gray-800 ${active==="diffuse"?"bg-gray-800 ":""} `} hidden={!((roles === "responsable" || roles === "User"))}>
              <div className="flex items-center"> 
                <FileInput className="h-6 w-6 mr-2" />
                <NavLink onClick={()=>handleActive("diffuse")} to="diffuse">My documents</NavLink>
              </div>
            </li>
            <li className={` mb-2  rounded-md px-3 py-2 transition-colors hover:bg-gray-800 ${active==="Verify"?"bg-gray-800 ":""} `} hidden={roles !== "responsable"}>
              <div className="flex items-center"> 
                <FileCheck2 className="h-6 w-6 mr-2" />
                <NavLink onClick={()=>handleActive("Verify")} to="Verify">Verify documents</NavLink>
              </div>
            </li>
            <li className={` mb-2  rounded-md px-3 py-2 transition-colors hover:bg-gray-800 ${active==="Dashboard"?"bg-gray-800 ":""} `} hidden={roles !== "admin"}>
         <NavLink onClick={()=>handleActive("Dashboard")} to="Dashboard" >Dashboard</NavLink>
            </li>
            <li className={` mb-2  rounded-md px-3 py-2 transition-colors hover:bg-gray-800 ${active==="ModTab"?"bg-gray-800 ":""} `} hidden={roles !== "admin"}>
            <NavLink onClick={()=>handleActive("ModTab")} to="ModTab" >Modify Employees</NavLink>
            </li>
            <li className={` mb-2  rounded-md px-3 py-2 transition-colors hover:bg-gray-800 ${active==="unverifiedTab"?"bg-gray-800 ":""} `} hidden={roles !== "admin"}>
            <NavLink onClick={()=>handleActive("unverifiedTab")} to="unverifiedTab" >Activate Employees</NavLink>
            </li>


            <li className="flex items-center absolute bottom-[5%] left-10  mb-2  rounded-md px-3 py-2 transition-colors hover:bg-gray-800 text-red-500 ">
            <LogOut /><br />
            <button onClick={logout}>
            log out
          </button> 
          </li>
          </ul>
        </nav>
      </div>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}




export default RootLayout