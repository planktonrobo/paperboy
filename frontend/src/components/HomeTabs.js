import { useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Nav, Spinner} from 'react-bootstrap'
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
  fetchMorePosts,
} from '../actions/posts'

import Posts from './Posts';
import {GrRefresh} from 'react-icons/gr';



const HomeTabs = () => {
  

   
    
    const dispatch = useDispatch()

    const selectedSubreddit = useSelector((state) => state.selectedSubreddit);
    const postsBySubreddit = useSelector(state => state.postsBySubreddit)
    
    const {
      isFetching,
      lastUpdated,
      items: posts,
      after
    } = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        items: []
      }
      

    const refresh = (subreddit) => {
        dispatch(invalidateSubreddit(subreddit));
        dispatch(fetchPostsIfNeeded(subreddit));
    
    }
    
    useEffect(() => {
     
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }, [selectedSubreddit])
    useEffect(() => {
      const onScroll = function () {
         if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          dispatch(fetchMorePosts(selectedSubreddit, after))
         }
      }
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scroll', onScroll)
   }, [selectedSubreddit, after, isFetching])
   
    
    return (
      <>
  
    
       
            <Nav className=" py-3 justify-content-center  "  activeKey={selectedSubreddit}
            onSelect={(k) => dispatch(selectSubreddit(k))} variant="pills"  >
               <Nav.Item  className="px-2">
                <Nav.Link eventKey="politics">🏛</Nav.Link>
              </Nav.Item>
              <Nav.Item className="px-2 ">
                <Nav.Link eventKey="news">🔥</Nav.Link>
              </Nav.Item>
              <Nav.Item className="px-2">
                  
                  <Nav.Link eventKey="technology">👾</Nav.Link>
                </Nav.Item>
              
              <Nav.Item  className="px-2">
                <Nav.Link eventKey="business">💼</Nav.Link>
              </Nav.Item >
              
              <Nav.Item className="px-2">
                  
                <Nav.Link eventKey="geopolitics">🌎</Nav.Link>
              </Nav.Item>
            </Nav>
        
       
            <div className="row justify-content-center pt-2">
              {selectedSubreddit === "news" ? <h4>Popular</h4>: <h4>{selectedSubreddit.charAt(0).toUpperCase()+selectedSubreddit.slice(1)} </h4>}
     
          {!isFetching &&
            <button className="btn btn-none p-0" style={{height: "100%", width: "2rem"}} onClick={() => refresh(selectedSubreddit)}>
              <GrRefresh/>
            </button>}
        </div>
     <div className="mx-auto" style={{maxWidth:"33rem", width: "90%"}}>
       <hr/>
     </div>
        
      
  
 
<Posts posts={posts}/>

<div className="row justify-content-center p-3">
<Spinner animation="grow" />
</div>

       
        
       

      </>
    )
}

export default HomeTabs
