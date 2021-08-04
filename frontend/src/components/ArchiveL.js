import { useDispatch, useSelector } from "react-redux";
import { getArchives, deleteArchive } from "../actions/archives";
import { useEffect } from "react";
import { Card, Row, Col, CardGroup } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import moment from "moment";
import NewArchiveForm from "./NewArchiveForm";
import {Link} from 'react-router-dom';
import { ShareButton, AddArticle, FilesButton} from './ActionButtons';
/* import PropTypes from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image"; */

const ArchiveL = () => {
  const archives = useSelector((state) => state.archives.archives);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArchives());
  }, [dispatch]);

  return (
   <>
      <Col  className="arc ">
  
          <Row className="justify-content-center justify-content-lg-start pt-5 ml-md-3">
            {auth.isAuthenticated ? 
          
          <CardGroup>
          <NewArchiveForm />
          {archives.map((archive) => (
            <div key={archive.id} className="col px-0 py-3">
              <Card style={{ width: "15rem" }}>
                <Card.Body>
                  <Link to={`/archive/${archive.id}`} className="text-dark text-decoration-none">
                  <Card.Title> {archive.emoji.concat(" ").concat(archive.title)}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <small>
                      Created{" "}
                      {moment(archive.created_at).format("MMMM Do, YYYY")}
                    </small>
                  </Card.Subtitle>
                  </Link>
                  <Card.Text>
                    <small >{archive.articles.length} Articles </small>
                    <AddArticle archive={archive.id} dispatch={dispatch}/>
                  </Card.Text>
                  <div className="row justify-content-between px-3">
                    <FilesButton articles={archive.articles}/>
                    <ShareButton link={`http://127.0.0.1:3000/archive/${archive.id}`}/>
                    <button
                      onClick={() => dispatch(deleteArchive(archive.id))}
                      className="btn btn-none"
                    >
                      <BsTrash />
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
       <div style={{width: "15rem"}}></div>
       </CardGroup> : <> <Link to="login">Login{'\u00A0'} </Link> to view and create archives.</> }
       </Row>

      </Col>
  </>
  );
};

/* ArchiveL.propType = {
  archives: PropTypes.array.isRequired,
}; */

export default ArchiveL;
