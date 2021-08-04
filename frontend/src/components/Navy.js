
import {
  Navbar,
  Nav,

} from "react-bootstrap";
import {NavLink, useLocation} from 'react-router-dom'
import {logout} from '../actions/auth'
import { BsArchiveFill, BsHouseFill, BsPencilSquare, BsPersonFill} from "react-icons/bs";
import {GiArchiveResearch} from 'react-icons/gi';
import { useDispatch, useSelector } from "react-redux";
import {useState} from 'react';



const Navy = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation();
  const archive = useSelector((state) => state.archives.archive.id);
  const auth = useSelector((state) => state.auth);
  const [expanded, setExpanded] = useState(false);

  return (
  
   
    <Navbar fixed="top" className="fixed-right border-bottom" expand="md" expanded={expanded}>

    <Navbar.Brand href="#"><img src="https://i.ibb.co/CJ7shTb/ppb-head.png" style={{ width: "3rem" }}/></Navbar.Brand>
    <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="basic-navbar-nav" />

    <Navbar.Collapse id="basic-navbar-nav">
    <Nav>
    <NavLink exact={true} onClick={() => setExpanded(false)} to="/"  className="nav-link" >
          <div className="row pt-3  pl-3">
            <h5  style={{ display: "inline", width:"2rem" }}>
              <BsHouseFill />
            </h5>
            <h5 style={{ display: "inline" }}>
              Home
            </h5>
          </div>
        </NavLink>
       
        <NavLink to="/archives" onClick={() => setExpanded(false)} isActive={() => ['/archives', `/archive/${archive}`].includes(pathname)} className="nav-link">
          <div className="row   pl-3">
            <h5  style={{ display: "inline", width:"2rem" }}>
              <BsArchiveFill />
            </h5>
            <h5  style={{ display: "inline" }}>
              Archives
            </h5>
          </div>
        </NavLink>
        <Nav.Link>
          <div className="row  pl-3">
            <h5  style={{ display: "inline", width:"2rem" }}>
              <GiArchiveResearch />
            </h5>
            <h5  style={{ display: "inline" }}>
              Sources
            </h5>
          </div>
        </Nav.Link>
        {auth.isAuthenticated ?
        <Nav.Link onClick={() => dispatch(logout())}>
          <div className="row  pl-3">
            <h5  style={{ display: "inline", width:"2rem" }}>
              <BsPersonFill />
            </h5>
            <h5  style={{ display: "inline" }}>
              {" "}
              Logout{" "}
            </h5>
          </div>
        </Nav.Link>: <NavLink onClick={() => setExpanded(false)} to="/login" className="nav-link">
          <div className="row  pl-3">
            <h5  style={{ display: "inline", width:"2rem" }}>
              <BsPersonFill />
            </h5>
            <h5  style={{ display: "inline" }}>
              {" "}
              Login{" "}
            </h5>
          </div>
        </NavLink>}
    </Nav>
      </Navbar.Collapse>

    </Navbar>
    
   
  
  );
};

export default Navy;
