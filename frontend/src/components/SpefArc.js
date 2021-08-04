import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {spefArchive} from '../actions/archives';
import {  useParams } from 'react-router-dom'
import {Col, Row, Spinner} from 'react-bootstrap';
import { ShareButton} from './ActionButtons';
import Timeline from './Timeline';
const SpefArc = () => {
    const { id } = useParams()
    
    const dispatch = useDispatch()
    const archive = useSelector((state) => state.archives.archive);
    const articles = useSelector((state) => state.archives.archive.articles);
    useEffect(() => {
  
    dispatch(spefArchive(id))
    }, [])
    return (
        <>
        <Col className="arc bg-light">
            <Row className="mt-5 justify-content-center align-items-center"><h1>{archive.emoji}</h1></Row>
            <Row className="mt-3 justify-content-center align-items-center"><h3 style={{height:"1.5rem"}}>{archive.title}</h3><ShareButton link={window.location.href}/></Row>
            <Row className=" justify-content-center align-items-center my-2"><small>Archive by @{archive.publisher_name}{'\u00A0'}{'\u00A0'}</small></Row>

            {archive.articles ? <Timeline articles={articles}/> : <Row className="justify-content-center p-3"><Spinner animation="grow"/></Row> }
            
        </Col>
        
        </>
    )
}

export default SpefArc
