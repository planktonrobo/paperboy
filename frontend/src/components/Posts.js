import React, { Component } from 'react'
import { Col, Image } from 'react-bootstrap';
import {ArcButton, SumButton, ShareButton} from './ActionButtons';
import LazyLoad from 'react-lazyload';

export default class Posts extends Component {
  render() {
    
    return (
      <div className=" row p-3 mt-3">
        <div className="mx-auto"> 
        {this.props.posts.filter(post => post.stickied !== true).filter(post => post.domain.split(".")[0] !== "self").map((post) => <LazyLoad height={100} offset={200} ><article className="mx-auto"  style={{ width:'90%', maxWidth: '33rem' }} key={post.id}><div className="row align-items-md-center">
        { post.thumbnail !== ""  ?<Col xs={5} sm={4}> <Image  src={post.thumbnail}/> </Col >: null}
        <Col xs={post.thumbnail !== "" ? 7: 12} sm={post.thumbnail !== "" ? 8: 12}><h7 style={{display:"inline"}}>{post.title}</h7><small><br/>{post.domain}</small></Col></div>
        <div className="row justify-content-between px-5 pt-2">
                   <ArcButton title={post.title} domain={post.domain} url={post.url}/><ShareButton link={post.url}/><SumButton url={post.url} title={post.title}/> 
                  </div><hr></hr></article></LazyLoad>)}
                  </div>
      </div>
    )
  }
}

