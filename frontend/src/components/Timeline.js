import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {ImNewspaper} from 'react-icons/im';
import React from 'react'
import Moment from 'react-moment'
import {ArcButton, SumButton, ShareButton} from './ActionButtons';
import { Image, Row} from 'react-bootstrap';



const Timeline = (props) => {
    const articles = props.articles
    return (
        <div >
<VerticalTimeline>
    {articles.map((article)=> 
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date={<Moment format="MMM Do, YYYY">{article.date}</Moment>}
    iconStyle={{ background: 'rgb(42, 42, 42)', color: '#fff' }}
    icon={<ImNewspaper/>}
    key = {article.id}
  >
      <Row className="justify-content-center">
      <Image className="pb-3" style={{maxWidth:"90%"}} src={article.thumbnail}/></Row>
    <h5 className="vertical-timeline-element-title">{article.title}{'\u00A0'}</h5>
    <small className="text-muted">{article.domain}</small>
    {article.notes ? 
    < Row className="p-3"><small>
    <details>
      <summary>Notes</summary>
      {article.notes}
    </details></small></Row> : null}
    <div className="row justify-content-between px-5 pt-2">
                   <ArcButton title={article.title} domain={article.domain} url={article.url}/><ShareButton link={article.url}/><SumButton url={article.url} title={article.title}/> 
                  </div>
                 
                 
  </VerticalTimelineElement>
  )}
 
  
</VerticalTimeline>
</div>
    )
}

export default Timeline
