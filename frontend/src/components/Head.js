import HomeTabs from "./HomeTabs";
import { Col } from "react-bootstrap";


import Date from "./Date";
import Trade from './Trade';



const Head = () => {

  return (
    <>

    
     
        <div  className="white " style={{height:"100"}}>
         
          <HomeTabs />
        </div>
        <Col style={{maxWidth:"25rem", minWidth:"25rem"}} className=" no border-left">
          <div className="sticky-top ">
        <Date />
        <div className="pr-3" >
          <Col>
        <Trade/></Col>
        </div>
        </div>
        </Col>
     
    </>
  );
};

export default Head;
