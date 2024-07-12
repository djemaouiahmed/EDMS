import React, { useRef, useState } from 'react';
import { Navigate, redirect } from 'react-router-dom';
const LoginPage = ({isLogged, onReplace}) => {
  
const [wr,setWr] = useState(0)
const [NoCr,setNoCr] = useState(0)
  const usernameRef = useRef(null); 
  const passwordRef = useRef(null); 
  const [usrNotVerified,setUsrNotVerified] = useState(false);
  const [inputStyle,setInputStyle] = useState(
    "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-700 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
  )
  const [labelStyle,setLabelStyle] = useState(
    "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
  )
 

   
    async function postinfolog(e){
      
  const Email = usernameRef.current.value;
  const password = passwordRef.current.value;
 
   
  if (Email === "" | password === "") {
 
setNoCr(1)
setWr(0)
setUsrNotVerified(false)
setInputStyle("block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-red-700 dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer")

setLabelStyle(
  "absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"

)

    return null;
}else 
{ setNoCr(0)
}
        e.preventDefault();
        
        const res = await fetch('http://localhost:3000/login',{
            method : 'POST', credentials : "include" ,headers : {
                "Content-Type" : "application/json"
            },body : JSON.stringify({
                loguser: Email,
                logpass: password

                
            })
        })

        const responseData = await res.json();
      console.log(responseData)
   if(responseData === "Success" )
   {
  isLogged(true)
  


   return true
   }else{
     if (responseData === 0) {
        setUsrNotVerified(true)
        setWr(0)
        setNoCr(0)
        setInputStyle("block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-red-700 dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer")
        setLabelStyle(
          "absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto")
     }else{
      setUsrNotVerified(false)
      setWr(0)
      setNoCr(0)
        if ( responseData.results.length === 0) {
      setNoCr(0)
      setUsrNotVerified(false)
        setWr(1)
          setInputStyle("block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-red-700 dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer")
          setLabelStyle(
            "absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto")
        }else{
          setNoCr(0)
          setUsrNotVerified(false)
      setWr(0)
        }
      }
      
      isLogged(false)
   return false
    }
      
    }






  return (
    <div className=" grid min-h-screen place-content-center rounded-md font-sans   ">
      <div className=" grid size-96  place-content-center rounded-2xl from-slate-400 shadow-2xl ">
        <form
          type="text"
         
          className="grid place-content-center"
        >
         
         <div className="relative z-0">
    <input type="text" ref = {usernameRef} className={inputStyle} placeholder="" />
    
    <label htmlfor="LogEmail" className={labelStyle}>Email</label>
</div>
<br />

<div className="relative z-0">
    <input type="password" ref = {passwordRef} className={inputStyle} placeholder="" />
    <label htmlfor="passlog" className={labelStyle}>Password</label>
</div>
<br />

          <div className="mt-2 grid place-content-center  ">
            <button
             onClick={postinfolog}
              className="w-24 rounded-full bg-blue-500 px-4 py-2 font-bold text-white  hover:bg-blue-700"
            >
              log in
            </button>
          </div>
        </form>
        <br />
        
        <p>dont have an account? <span 
         className=" size-4 hover:cursor-pointer text-blue-500" onClick={()=>( window.location.href = "/register")}>Register</span></p>
         
 { wr ===1 && <p className=" grid text-red-500 place-content-center">Invalid Email or Password</p>}
 { NoCr ===1 && <p className=" grid text-red-500 place-content-center">Please Enter Email and Password</p>}
 { usrNotVerified && <p className=" grid text-red-500 place-content-center">Please Verify Your Email</p>}
      </div>
   
    </div>
  );
};

export default LoginPage;
