import { useEffect, useState } from "react";
import { AiFillFileText, AiOutlineLogout } from "react-icons/ai";
import {
  
  FaGamepad,
  FaStopwatch,
} from "react-icons/fa";
import "../../css/App.scss"
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import {

  RiShoppingBag3Fill,
} from "react-icons/ri";
import { Link, Location, useLocation, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import Logo from "../../assets/icons/amaz.png"

import { BiLogOutCircle } from "react-icons/bi";
import { logout } from "../../redux/reducers/users/userSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

const AdminSidebar = () => {
  const { user } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user])
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );
  

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };
  

  const handleLogout = () => {
  dispatch(logout()).then(() => {
    navigate("/login");
  });
}


  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <>
   
      {phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)}>
          <HiMenuAlt4 />
        </button>
      )}

      <aside
        style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: showModal ? "0" : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }
      >
        {/* <h2>Logo.</h2> */}
                    {/* <div className="logo sm:w-1/6 w-5/12 text-center"> */}
              <h1>
                <Link to="/admin/products" className="text-white"><img style={{marginTop:'10px' ,marginLeft:'40px'}} src={Logo} className="bg-transparent" width="100" alt="logo" /></Link>
              </h1>
            {/* </div> */}

        <DivOne location={location} />
        

       <DivTwo location={location} handleLogout={handleLogout} />

        {phoneActive && (
          <button id="close-sidebar" onClick={() => setShowModal(false)}>
            Close
          </button>
        )}
      </aside>
    </>
  );
};

const DivOne = ({ location }: { location: Location }) => (
  <div>
    <h5>Dashboard</h5>
    <ul>
      
      <Li
        url="/admin/products"
        text="Product"
        Icon={RiShoppingBag3Fill}
        location={location}
      />
      <Li
        url="/admin/customer"
        text="Customer"
        Icon={IoIosPeople}
        location={location}
      />
      <Li
        url="/admin/transaction"
        text="Transaction"
        Icon={AiFillFileText}
        location={location}
      />
    </ul>
  </div>
);



const DivTwo = ({ location, handleLogout }: { location: Location; handleLogout: () => void }) => (
  <div>
    <h5>Logout</h5>
    <ul>
      <li >
        <button onClick={handleLogout} className="logout-button">
          <BiLogOutCircle />
          Logout
        </button>
       
        
      </li>
    </ul>
  </div>
);


interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}
const Li = ({ url, text, location, Icon }: LiProps) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url)
        ? "rgba(0,115,255,0.1)"
        : "white",
    }}
  >
    <Link
      to={url}
      style={{
        color: location.pathname.includes(url) ? "rgb(0,115,255)" : "black",
      }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default AdminSidebar;


