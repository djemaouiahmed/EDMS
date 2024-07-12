
import { UserCheck,UserX,UserCog } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import CountUp from 'react-countup'
const InfoPannel = () => {
    const [countVer,setCountVer] = useState(0);
    const [countUnver,setCountUnver] = useState(0);
    useEffect(() => {
        fetch('http://localhost:3000/admin/info').then(res=>res.json()).then(results =>{ 
            
        setCountVer(results[0][0].accepted_users);
        setCountUnver(results[1][0].unaccepted_users);
       })}, []);
     
    

    return (  
        <div className=" relative w-max h-fit bottom-[360px] left-36">
<div className="  h-36 w-96 bg-white  rounded-xl shadow-md bottom-20 ">
    <div className='relative place-content-center grid top-10 right-32 '>
<UserCheck className="text-green-500 size-12" />
</div>
<p className=" relative place-content-center grid top-2 text-xl font-bold  ">Accepted Employees :  <CountUp duration={2} className="relative bottom-7 left-52" end={countVer} /></p> 
</div>




<div className=" left-96 mx-4 h-36 w-96 relative  bg-white  rounded-xl shadow-md mt-5  bottom-[165px] ">
<div className='relative place-content-center grid top-10 right-32 '>
<UserCog className="text-yellow-600 size-12" />
</div>
<p className=" relative place-content-center grid top-2 text-xl font-bold  ">Pending Employees :  <CountUp duration={2} className="relative bottom-7 left-52" end={countUnver} /></p> 
</div>

                </div>
    );
}
 
export default InfoPannel;