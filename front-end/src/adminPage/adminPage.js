

import DashboardTab from "./dashboardTab";
import InfoPannels from "./infoPannels";



const AdminPage = () => {
return(<div className=" relative top-20 w-full"><DashboardTab/><div className=" absolute bottom-12 right-[103%] w-[10px] h-[10px]"><InfoPannels/></div></div>);
}
 
export default AdminPage;