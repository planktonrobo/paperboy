import React from "react";
import { BsArchiveFill, BsHouseFill, BsPencilSquare, BsPersonFill} from "react-icons/bs";
import {GiArchiveResearch} from 'react-icons/gi';
import { Nav, Image } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { logout} from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
const LeftBar = () => {

    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const archive = useSelector((state) => state.archives.archive.id);
    const auth = useSelector((state) => state.auth);
    
  return (
    <div className="d-none d-md-block border-right navleft">
      <Nav
        
        className="align-items-center flex-column position-fixed  "
        
      >
        <Image
          src="https://i.ibb.co/CJ7shTb/ppb-head.png"
          className="my-2 "
          style={{ width: "3.5rem" }}
        />

        <NavLink exact={true} to="/"  className="nav-link" >
          <div className="row pt-3  p-1">
            <h5 className="subclass" style={{ display: "inline" }}>
              <BsHouseFill />
            </h5>
            <h5 className="assclass" style={{ display: "inline" }}>
              Home
            </h5>
          </div>
        </NavLink>
       
        <NavLink to="/archives" isActive={() => ['/archives', `/archive/${archive}`].includes(pathname)} className="nav-link">
          <div className="row   p-1">
            <h5 className="subclass" style={{ display: "inline" }}>
              <BsArchiveFill />
            </h5>
            <h5 className="assclass" style={{ display: "inline" }}>
              Archives
            </h5>
          </div>
        </NavLink>
        <Nav.Link>
          <div className="row  p-1">
            <h5 className="subclass" style={{ display: "inline" }}>
              <GiArchiveResearch />
            </h5>
            <h5 className="assclass" style={{ display: "inline" }}>
              Sources
            </h5>
          </div>
        </Nav.Link>
        {auth.isAuthenticated ?
        <Nav.Link onClick={() => dispatch(logout())}>
          <div className="row  p-1">
            <h5  className="subclass"  style={{ display: "inline", width:"2rem" }}>
              <BsPersonFill />
            </h5>
            <h5  className="assclass" style={{ display: "inline" }}>
              {" "}
              Logout{" "}
            </h5>
          </div>
        </Nav.Link>: <NavLink  to="/login" className="nav-link">
          <div className="row  p-1">
            <h5   className="subclass"  style={{ display: "inline", width:"2rem" }}>
              <BsPersonFill />
            </h5>
            <h5  className="assclass" style={{ display: "inline" }}>
              {" "}
              Login{" "}
            </h5>
          </div>
        </NavLink>}
      </Nav>
    </div>
  );
};

export default LeftBar;
