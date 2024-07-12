import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
NavigationMenu,
NavigationMenuContent,
NavigationMenuIndicator,
NavigationMenuItem,
NavigationMenuLink,
NavigationMenuList,
NavigationMenuTrigger,
NavigationMenuViewport,
} from "../ui/navigation-menu"

const AdminSide = ({roles}) => {



async function logout() {
  
  const response = await fetch('http://localhost:3000/logout', {
    method: 'GET',
    credentials: 'include' 
});

  localStorage.removeItem("isAuthenticated");
  window.location.href="/login"
        
      
}




  const style = "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 focus:text-blue-700 focus:bg-gray-100 md:focus:bg-transparent md:focus:text-blue-700 ";
  return (
      <div>
      <nav className="bg-gray-50 border-gray-200 h-20  place-content-center border-2 relative" >
        <div className="relative max-w-screen-xl flex flex-wrap items-center  justify-between mx-auto p-4">
      
            
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <DropdownMenu>
        <DropdownMenuTrigger>User</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem >Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Favorite Documents</DropdownMenuItem>
          <DropdownMenuItem>Documents added</DropdownMenuItem>
          <div className=" text-red-600">
          <button onClick={logout}>
          <DropdownMenuItem  > log out</DropdownMenuItem>
          </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 relative left-32" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 borderray-10 border-g0 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li hidden={!(roles === "responsable" || roles === "User")}>
              <NavLink to="/" className={style} aria-current="page">Home</NavLink>
            </li>
            <li hidden={!(roles === "responsable" || roles === "User")}>
            <NavigationMenu >
<NavigationMenuList>
  <NavigationMenuItem className="bg-gray-50">
    <NavigationMenuTrigger><NavLink to ="download" className={style}>Documents</NavLink></NavigationMenuTrigger>
    <NavigationMenuContent>
      <NavigationMenuLink ><NavLink to ="download" className={style}>Inbox</NavLink></NavigationMenuLink>
      <NavigationMenuLink><NavLink to ="diffuse" className={style}>Diffuse</NavLink></NavigationMenuLink>
    </NavigationMenuContent>
  </NavigationMenuItem>
</NavigationMenuList>
</NavigationMenu>

              
            </li>
            <li hidden={!(roles === "responsable" || roles === "User")}>
              <NavLink  to ="Mydocuments" className={style}>My documents</NavLink>
            </li>
            <li hidden={!((roles === "responsable" || roles === "User"))}>
              <NavLink  to="Search" className={style}>Search</NavLink>
            </li>
            <li hidden={roles !== "admin"}>
              <NavLink to="ModTab"  className={style}>admin</NavLink>
            </li>
            <li hidden={roles !== "responsable"}>
              <NavLink to="Verify"  className={style}>Verify documents</NavLink>
            </li>
          </ul>
        </div>
        </div>
      </nav>
      
          <Outlet/>

      </div>
           );
}

export default AdminSide;
