import React, { useRef, useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';












const RegisterPage = () => {




const red = "grid text-red-500 place-content-center";
const green = "grid text-green-500 place-content-center"
const [regBtnStyle,setRegBtnStyle] = useState("w-24 rounded-full bg-gray-400 px-4 py-2 font-bold text-white ")
    const [inputValue, setInputValue] = useState('');
    const [upper, setUpper] = useState(red);
    const [eight, setEight] = useState(red);
    const [number, setNumber] = useState(red);
    const [special, setSpecial] = useState(red);
    const [clicked, setClicked] = useState(false);
    const[disabled,setDisabled] = useState(true);
    const[sp,setSp] = useState(false)
    const[nm ,setNm] = useState(false)
    const[eightt ,setEightt] = useState(false)
    const[up ,setUp] = useState(false)
    const handleClick = (ev) => {
    
      setClicked(true);
    }
useEffect(() => {
  



    if (clicked !== null){




      if (inputValue.length > 8) {
        setEight(green);  
     setEightt(true)
      }else{
        setEight(red);
         setEightt(false) 
      }
    if (  inputValue!== inputValue.toLowerCase()) {

    setUpper(green);
    setUp(true)
    }else{
      setUpper(red);
      setUp(false)
    }
  if ( /\d/.test(inputValue) ) {
    setNumber (green);
setNm(true)
  } else {
    setNumber(red);
    setNm(false)
  }
  if (/[^\w\s]/.test(inputValue)) {
    setSpecial (green);
    setSp(true)
   
  } else {
    setSpecial(red);
    setSp(false)
  }
  if (eightt && up && nm && sp) {
    setDisabled(false);
    setRegBtnStyle("w-24 rounded-full bg-gray-500 px-4 py-2 font-bold text-white  hover:bg-gray-700")
    setClicked(false);
  }
  else {
    setDisabled(true);
    setRegBtnStyle("w-24 rounded-full bg-gray-400 px-4 py-2 font-bold text-white ")
   
  }
}
}, [inputValue, clicked,eightt,up,nm,sp,disabled,regBtnStyle]);

    const handleChange = (event) => {

      setInputValue(event.target.value);
  

    }
    const handleBlur = () => {
      
      setClicked(false); 
    };
  
  
  







  const [wr,setWr] = useState(0)
  const [NoCr,setNoCr] = useState(0)
    const firstNameRef = useRef(null); 
    const lastNameRef = useRef(null); 
const emailRef = useRef(null);
    const passwordRef = useRef(null); 

    const [inputStyle,setInputStyle] = useState(
      "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-700 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    )
    const [labelStyle,setLabelStyle] = useState(
      "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
    )
      
      
        async function postinfo(e){
const fname = firstNameRef.current.value;
const lname = lastNameRef.current.value;
const email = emailRef.current.value;
const password = passwordRef.current.value;
if (fname === "" || lname === "" || email === "" || password === "") {
  setNoCr(1)
  setWr(0)
  setInputStyle("block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-red-700 dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer")
  setLabelStyle(
    "absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto")
  return 

}


            e.preventDefault();
            const res = await fetch('http://localhost:3000/register',{
                method : 'POST', headers : {
                    "Content-Type" : "application/json"
                },body : JSON.stringify({
                    fname: fname,
                    lname: lname,
                    email: email,
                    password: password

                    
                })
              
            })
            const responseData = await res.json();
            console.log(responseData);
            if (responseData === "Success"){
             window.location.href = "/login"
            }
        if ( responseData.results !== 0) {
          setWr(1)
            setInputStyle("block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-red-700 dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer")
            setLabelStyle(
              "absolute text-sm text-red-500 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto")
              setNoCr(0)
          }else{
            setWr(0)
          }
        }





    return (  

<div>
        <div className=" grid min-h-screen place-content-center rounded-md font-sans   ">
         
        <div className="  h-[500px] w-[800px]  place-content-center rounded-2xl from-slate-400 shadow-2xl bg-white ">
     
        <div className=' relative bottom-64 left-48 '>
        <div a className=' top-[443px] right-48 rounded-l-2xl relative bg-gray-800 h-[500px] w-[400px]'><img src='../../DoCOMPASS-removebg-preview.png' className='size-96'></img>
        <button className=" place-content-center size-4 hover:cursor-pointer relative left-16 top-16 text-white  w-[250px] hover:underline" onClick={()=>( window.location.href = "/login")}> <p>Already have an account? Log In</p></button></div>
          <form
            type="text"
            method="POST"
            action="/register"
            className="grid place-content-center h-fit"
          >
                




                <div className="relative z-0">
      <input type="text" ref={firstNameRef} id ="f" className={inputStyle} placeholder=""  required/>
  
      <label htmlForfor="f" className={labelStyle}>First Name</label>
  </div>
       
<br />


  <div className="relative z-0">
      <input type="text" ref={lastNameRef} id="l" className={inputStyle} placeholder="" required />
  
      <label htmlFor="l" className={labelStyle}>Last Name</label>
  </div>


<br />

           <div className="relative z-0">
      <input type='email' pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" ref={emailRef} id="e" className={inputStyle} placeholder="" required />
  
      <label htmlFor="e" className={labelStyle}>Email</label>
  </div>
  <br />
  


  <div className="relative z-0">
      <input type="password" ref={passwordRef} id="p" value={inputValue} onChange={handleChange} className={inputStyle} onClick={handleClick} onBlur={handleBlur} placeholder=" " />

      <label htmlFor="p" className={labelStyle}>Password</label>
  </div>
  <br />
            <div className="mt-2 grid place-content-center  ">
              <button
              onClick={postinfo}
                className={regBtnStyle}
                disabled={disabled}
              >
               Register
              </button>
            </div>
            
      <div className='h-16'>
            { clicked  &&  <div className=''>

<p className={eight}>8 characters</p>
<p className={number}>contains number</p>
<p className={upper}>contains capital letter</p>
<p className={special}>contains special character</p>
          </div>}

{NoCr === 1 && <p className=" grid text-red-500 place-content-center">Please Enter all the fields</p>}
          {wr === 1 && <p className=" grid text-red-500 place-content-center">Email already exists</p>}
          </div>
          </form>
         
      
        </div>
      </div>

        </div>
        </div>
    );



        
}
 
export default RegisterPage;